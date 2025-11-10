#!/bin/bash

# Adapted from: https://www.osadl.org/Create-a-latency-plot-from-cyclictest-hi.bash-script-for-latency-plot.0.html
# 
# Enhancements:
# 1. Run cyclictest twice: once with --clock=1 (CLOCK_MONOTONIC) and once with --clock=0 (CLOCK_REALTIME)
# 2. Generate separate histogram plots for each clock type
# 3. Dynamically fetch the number of CPU cores
# 4. Follow security best practices with set -euo pipefail and proper quoting
# 5. Output plots to ../images/ directory
# 6. Improved error handling and variable management

set -euo pipefail

# Configuration
readonly DUR=1  # Duration in minutes
readonly CLOCK_TYPES=(0 1)
readonly CLOCK_NAMES=("CLOCK_MONOTONIC" "CLOCK_REALTIME")
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly OUTPUT_DIR="${SCRIPT_DIR}/../images"
readonly WORK_DIR="$(mktemp -d)"

# Cleanup on exit
trap 'rm -rf "${WORK_DIR}"' EXIT

# Function to run cyclictest and generate plot
generate_plot() {
  local clock_type="$1"
  local clock_name="$2"
  local output_file="${WORK_DIR}/output_clock${clock_type}"
  local histogram_base="${WORK_DIR}/histogram_clock${clock_type}"
  local plotcmd_file="${WORK_DIR}/plotcmd_clock${clock_type}"
  local plot_output="${OUTPUT_DIR}/plot_clock${clock_type}.png"

  echo "Running cyclictest for ${DUR} minute(s) with --clock=${clock_type} (${clock_name})"
  
  # Run cyclictest
  # Reference: https://wiki.linuxfoundation.org/realtime/documentation/howto/tools/cyclictest
  cyclictest \
    -D"${DUR}m" \
    -m \
    -Sp90 \
    -i200 \
    -h400 \
    --system \
    --smp \
    --mlockall \
    --clock="${clock_type}" \
    -q >"${output_file}"

  # Get maximum latency
  local max
  max=$(grep "Max Latencies" "${output_file}" | tr " " "\n" | sort -n | tail -1 | sed 's/^0*//')
  
  echo "  Max latency: ${max} us"

  # Grep data lines, remove empty lines and create a common field separator
  grep -v -e "^#" -e "^$" "${output_file}" | tr " " "\t" >"${histogram_base}"

  # Get number of CPU cores
  local cores
  cores=$(nproc)
  echo "  Detected ${cores} CPU core(s)"

  # Create per-core histogram data files
  for i in $(seq 1 "${cores}"); do
    local column
    column=$((i + 1))
    cut -f1,"${column}" "${histogram_base}" >"${histogram_base}_${i}"
  done

  # Create plot command header
  # Reference: http://www.gnuplot.info/
  cat >"${plotcmd_file}" <<EOF
set title "Latency Histogram - ${clock_name}"
set terminal png
set xlabel "Latency (us), max ${max} us"
set logscale y
set xrange [0:400]
set yrange [0.8:*]
set ylabel "Number of latency samples"
set output "${plot_output}"
plot \\
EOF

  # Append plot command data references
  for i in $(seq 1 "${cores}"); do
    if [[ $i -ne 1 ]]; then
      echo ", \\" >>"${plotcmd_file}"
    fi
    
    local cpuno=$((i - 1))
    local title
    if [[ $cpuno -lt 10 ]]; then
      title=" CPU${cpuno}"
    else
      title="CPU${cpuno}"
    fi
    
    echo -n "\"${histogram_base}_${i}\" using 1:2 title \"${title}\" with histeps" >>"${plotcmd_file}"
  done
  
  echo "" >>"${plotcmd_file}"

  # Execute plot command
  gnuplot -persist <"${plotcmd_file}"
  
  echo "  Histogram plot saved to: ${plot_output}"
  echo ""
}

# Main execution
main() {
  echo "=========================================="
  echo "Cyclictest Dual-Clock Latency Plotter"
  echo "=========================================="
  echo ""

  # Verify prerequisites
  if ! command -v cyclictest &>/dev/null; then
    echo "Error: cyclictest not found. Please install rt-tests package." >&2
    exit 1
  fi

  if ! command -v gnuplot &>/dev/null; then
    echo "Error: gnuplot not found. Please install gnuplot." >&2
    exit 1
  fi

  # Create output directory if it doesn't exist
  if ! mkdir -p "${OUTPUT_DIR}"; then
    echo "Error: Failed to create output directory: ${OUTPUT_DIR}" >&2
    exit 1
  fi

  echo "Output directory: ${OUTPUT_DIR}"
  echo "Working directory: ${WORK_DIR}"
  echo ""

  # Run cyclictest and generate plots for both clock types
  for idx in "${!CLOCK_TYPES[@]}"; do
    generate_plot "${CLOCK_TYPES[$idx]}" "${CLOCK_NAMES[$idx]}"
  done

  echo "=========================================="
  echo "Completed. Generated plots:"
  echo "  - ${OUTPUT_DIR}/plot_clock1.png (CLOCK_MONOTONIC)"
  echo "  - ${OUTPUT_DIR}/plot_clock0.png (CLOCK_REALTIME)"
  echo "=========================================="
}

main "$@"
