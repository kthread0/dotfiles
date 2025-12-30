/****************************************************************************************
 * Fastfox                                                                              *
 * "Non ducor duco"                                                                     *
 * priority: speedy browsing                                                            *
 * version: 146                                                                         *
 * url: https://github.com/yokoffing/Betterfox                                          *
 ***************************************************************************************/

/****************************************************************************
 * SECTION: GENERAL                                                        *
****************************************************************************/

user_pref("layout.frame_rate", 180);

// PREF: initial paint delay
// How long FF will wait before rendering the page (in ms)
// [NOTE] You may prefer using 250.
// [NOTE] Dark Reader users may want to use 1000 [3].
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1283302
// [2] https://docs.google.com/document/d/1BvCoZzk2_rNZx3u9ESPoFjSADRI0zIPeJRXFLwWXx_4/edit#heading=h.28ki6m8dg30z
// [3] https://old.reddit.com/r/firefox/comments/o0xl1q/reducing_cpu_usage_of_dark_reader_extension/
// [4] https://reddit.com/r/browsers/s/wvNB7UVCpx
user_pref("nglayout.initialpaint.delay", 5); // DEFAULT; formerly 250
user_pref("nglayout.initialpaint.delay_in_oopif", 5); // DEFAULT

// PREF: Font rendering cache in Skia (32MB)
// Increases font cache size to improve performance on text-heavy websites.
// Especially beneficial for sites with many font faces or complex typography.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1239151#c2
user_pref("gfx.content.skia-font-cache-size", 64); // 32 MB; default=5; Chrome=20

// PREF: page reflow timer
// Rather than wait until a page has completely downloaded to display it to the user,
// web browsers will periodically render what has been received to that point.
// Because reflowing the page every time additional data is received slows down
// total page load time, a timer was added so that the page would not reflow too often.
// This preference specfies whether that timer is active.
// [1] https://kb.mozillazine.org/Content.notify.ontimer
// true = do not reflow pages at an interval any higher than that specified by content.notify.interval (default)
// false = reflow pages whenever new data is received
user_pref("content.notify.ontimer", true); // DEFAULT

// PREF: content notification delay - notification interval (in microseconds) to avoid layout thrashing
// When Firefox is loading a page, it periodically reformats
// or "reflows" the page as it loads. The page displays new elements
// every 0.12 seconds by default. These redraws increase the total page load time.
// The default value provides good incremental display of content
// without causing an increase in page load time.
// [NOTE] Lowering the interval will increase responsiveness
// but also increase the total load time.
// [WARNING] If this value is set below 1/10 of a second, it starts
// to impact page load performance.
// [EXAMPLE] 100000 = .10s = 100 reflows/second
// [1] https://searchfox.org/mozilla-central/rev/c1180ea13e73eb985a49b15c0d90e977a1aa919c/modules/libpref/init/StaticPrefList.yaml#1824-1834
// [2] https://web.archive.org/web/20240115073722/https://dev.opera.com/articles/efficient-javascript/?page=3#reflow
// [3] https://web.archive.org/web/20240115073722/https://dev.opera.com/articles/efficient-javascript/?page=3#smoothspeed
user_pref("content.notify.interval", 100000); // (.10s); default=120000 (.12s)
user_pref("content.max.tokenizing.time", 1000000); // (1.00s); alt=2000000; HIDDEN
user_pref("content.interrupt.parsing", true); // HIDDEN

// PREF: UI responsiveness threshold
user_pref("content.switch.threshold", 300000); // HIDDEN; default= 750000; alt=500000

// PREF: split text nodes to a length
// The number of bytes in a text node.
user_pref("content.maxtextrun", 16384); // DEFAULT; HIDDEN

// PREF: new tab preload
// [WARNING] Disabling this may cause a delay when opening a new tab in Firefox.
// [1] https://wiki.mozilla.org/Tiles/Technical_Documentation#Ping
// [2] https://github.com/arkenfox/user.js/issues/1556
user_pref("browser.newtab.preload", true); // DEFAULT

// PREF: disable EcoQoS [WINDOWS]
// Background tab processes use efficiency mode on Windows 11 to limit resource use.
// [WARNING] Leave this alone, unless you're on Desktop and you rely on
// background tabs to have maximum performance.
// [1] https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1796525
// [3] https://bugzilla.mozilla.org/show_bug.cgi?id=1800412
// [4] https://reddit.com/r/firefox/comments/107fj69/how_can_i_disable_the_efficiency_mode_on_firefox/
user_pref("dom.ipc.processPriorityManager.backgroundUsesEcoQoS", false);

// PREF: control how tabs are loaded when a session is restored
// true=Tabs are not loaded until they are selected (default)
// false=Tabs begin to load immediately.
user_pref("browser.sessionstore.restore_on_demand", true); // DEFAULT
user_pref("browser.sessionstore.restore_pinned_tabs_on_demand", true);
user_pref("browser.sessionstore.restore_tabs_lazily", true); // DEFAULT

// PREF: disable preSkeletonUI on startup [WINDOWS]
user_pref("browser.startup.preXulSkeletonUI", false);

// PREF: lazy load iframes
user_pref("dom.iframe_lazy_loading.enabled", true); // DEFAULT [FF121+]

// PREF: Prioritized Task Scheduling API
// [1] https://github.com/yokoffing/Betterfox/issues/355
// [2] https://blog.mozilla.org/performance/2022/06/02/prioritized-task-scheduling-api-is-prototyped-in-nightly/
// [3] https://medium.com/airbnb-engineering/building-a-faster-web-experience-with-the-posttask-scheduler-276b83454e91
// [4] https://github.com/WICG/scheduling-apis/blob/main/explainers/prioritized-post-task.md
// [5] https://wicg.github.io/scheduling-apis/
// [6] https://caniuse.com/mdn-api_taskcontroller
user_pref("dom.enable_web_task_scheduling", true); // DEFAULT [FF142+]

/****************************************************************************
 * SECTION: GFX RENDERING TWEAKS                                            *
****************************************************************************/

// PREF: Webrender tweaks
// [1] https://searchfox.org/mozilla-central/rev/6e6332bbd3dd6926acce3ce6d32664eab4f837e5/modules/libpref/init/StaticPrefList.yaml#6202-6219
// [2] https://hacks.mozilla.org/2017/10/the-whole-web-at-maximum-fps-how-webrender-gets-rid-of-jank/
// [3] https://www.reddit.com/r/firefox/comments/tbphok/is_setting_gfxwebrenderprecacheshaders_to_true/i0bxs2r/
// [4] https://www.reddit.com/r/firefox/comments/z5auzi/comment/ixw65gb?context=3
// [5] https://gist.github.com/RubenKelevra/fd66c2f856d703260ecdf0379c4f59db?permalink_comment_id=4532937#gistcomment-4532937
user_pref("gfx.webrender.all", true); // enables WR + additional features
user_pref("gfx.webrender.precache-shaders", true); // longer initial startup time
user_pref("gfx.webrender.compositor", true); // DEFAULT WINDOWS macOS
user_pref("gfx.webrender.compositor.force-enabled", true); // enforce

// PREF: Webrender layer compositor
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1945683
// [2] https://www.reddit.com/r/firefox/comments/1p58qre/firefox_is_getting_ready_to_make_youtube_fast/
// [3] https://www.ghacks.net/2025/11/24/these-two-tweaks-should-improve-firefoxs-performance-on-youtube-significantly/
user_pref("gfx.webrender.layer-compositor", true);
// If your PC uses an AMD GPU, you might want to make a second change.
// This one improves CPU usage on AMD systems.
user_pref("media.wmf.zero-copy-nv12-textures-force-enabled", true);

// PREF: if your hardware doesn't support Webrender, you can fallback to Webrender's software renderer
// [1] https://www.ghacks.net/2020/12/14/how-to-find-out-if-webrender-is-enabled-in-firefox-and-how-to-enable-it-if-it-is-not/
//user_pref("gfx.webrender.software", true); // Software Webrender uses CPU instead of GPU
    //user_pref("gfx.webrender.software.opengl", true); // LINUX

// PREF: GPU-accelerated Canvas2D
// Uses Accelerated Canvas2D for hardware acceleration of Canvas2D.
// This provides a consistent acceleration architecture across all platforms
// by utilizing WebGL instead of relying upon Direct2D.
// [WARNING] May cause issues on some Windows machines using integrated GPUs [2] [3]
// Add to your overrides if you have a dedicated GPU.
// [NOTE] Higher values will use more memory.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1741501
// [2] https://github.com/yokoffing/Betterfox/issues/153
// [3] https://github.com/yokoffing/Betterfox/issues/198
user_pref("gfx.canvas.accelerated", true); // [DEFAULT FF133+]
user_pref("gfx.canvas.accelerated.cache-items", 65536); // [default=8192 FF135+]; Chrome=4096
user_pref("gfx.canvas.accelerated.cache-size", 8192); // default=256; Chrome=512
user_pref("gfx.canvas.max-size", 65536); // DEFAULT=32767

// PREF: WebGL
user_pref("webgl.max-size", 65536); // default=1024
user_pref("webgl.force-enabled", true);

// PREF: prefer GPU over CPU
// At best, the prefs do nothing on Linux/macOS.
// At worst, it'll result in crashes if the sandboxing is a WIP.
// [1] https://firefox-source-docs.mozilla.org/dom/ipc/process_model.html#gpu-process
user_pref("layers.gpu-process.enabled", true); // DEFAULT WINDOWS
user_pref("layers.gpu-process.force-enabled", true); // enforce
user_pref("layers.mlgpu.enabled", true); // LINUX
user_pref("media.hardware-video-decoding.enabled", true); // DEFAULT WINDOWS macOS
user_pref("media.hardware-video-decoding.force-enabled", true); // enforce
user_pref("media.gpu-process-decoder", true); // DEFAULT WINDOWS
user_pref("media.ffmpeg.vaapi.enabled", true); // LINUX

// PREF: hardware and software decoded video overlay [FF116+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1829063
// [2] https://phabricator.services.mozilla.com/D175993
user_pref("gfx.webrender.dcomp-video-hw-overlay-win", true); // DEFAULT
user_pref("gfx.webrender.dcomp-video-hw-overlay-win-force-enabled", true); // enforce
user_pref("gfx.webrender.dcomp-video-sw-overlay-win", true); // DEFAULT
user_pref("gfx.webrender.dcomp-video-sw-overlay-win-force-enabled", true); // enforce

/****************************************************************************
 * SECTION: DISK CACHE                                                     *
****************************************************************************/

// PREF: disk cache
// [NOTE] If you think it helps performance, then feel free to override this.
// [SETTINGS] See about:cache
// More efficient to keep the browser cache instead of having to
// re-download objects for the websites you visit frequently.
// [1] https://www.janbambas.cz/new-firefox-http-cache-enabled/
user_pref("browser.cache.disk.enable", true);

// PREF: disk cache size
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=913808,968106,968101
// [2] https://rockridge.hatenablog.com/entry/2014/09/15/165501
// [3] https://www.reddit.com/r/firefox/comments/17oqhw3/firefox_and_ssd_disk_consumption/
user_pref("browser.cache.disk.smart_size.enabled", false); // force a fixed max cache size on disk
user_pref("browser.cache.disk.capacity", 8192000); // default=256000; size of disk cache; 1024000=1GB, 2048000=2GB
user_pref("browser.cache.disk.max_entry_size", 819200); // DEFAULT (50 MB); maximum size of an object in disk cache

// PREF: Race Cache With Network (RCWN) [FF59+]
// [ABOUT] about:networking#rcwn
// Firefox concurrently sends requests for cached resources to both the
// local disk cache and the network server. The browser uses whichever
// result arrives first and cancels the other request. This approach sometimes
// loads pages faster because the network can be quicker than accessing the cache
// on a hard drive. When RCWN is enabled, the request might be served from
// the server even if you have valid entry in the cache. Set to false if your
// intention is to increase cache usage and reduce network usage.
// [1] https://slides.com/valentingosu/race-cache-with-network-2017
// [2] https://simonhearne.com/2020/network-faster-than-cache/
// [3] https://support.mozilla.org/en-US/questions/1267945
// [4] https://askubuntu.com/questions/1214862/36-syns-in-a-row-how-to-limit-firefox-connections-to-one-website
// [5] https://bugzilla.mozilla.org/show_bug.cgi?id=1622859
// [6] https://soylentnews.org/comments.pl?noupdate=1&sid=40195&page=1&cid=1067867#commentwrap
user_pref("network.http.rcwn.enabled", true);

// PREF: attempt to RCWN only if a resource is smaller than this size
user_pref("network.http.rcwn.small_resource_size_kb", 512); // DEFAULT

// PREF: cache memory pool
// Cache v2 provides a memory pool that stores metadata (such as response headers)
// for recently read cache entries [1]. It is managed by a cache thread, and caches with
// metadata in the pool appear to be reused immediately.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=986179
user_pref("browser.cache.disk.metadata_memory_limit", 32768); // default=250 (0.25 MB); limit of recent metadata we keep in memory for faster access

// PREF: number of chunks we preload ahead of read
// Large content such as images will load faster.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=913819,988318
// [2] http://www.janbambas.cz/new-firefox-http-cache-enabled/
user_pref("browser.cache.disk.preload_chunk_count", 16); // DEFAULT

// PREF: the time period used to re-compute the frecency value of cache entries
// The frequency algorithm is used to select entries, and entries that are recently
// saved or frequently reused are retained. The frecency value determines how
// frequently a page has been accessed and is used by Firefox's cache algorithm.
// The frequency algorithm is used to select entries, and entries that are recently
// saved or frequently reused are retained. The frecency value determines how
// often a page has been accessed and is used by Firefox's cache algorithm.
// When the memory pool becomes full, the oldest data is purged. By default,
// data older than 6 hours is treated as old.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=942835,1012327
// [2] https://bugzilla.mozilla.org/buglist.cgi?bug_id=913808,968101
user_pref("browser.cache.frecency_half_life_hours", 6); // DEFAULT

// PREF: memory limit (in kB) for new cache data not yet written to disk
// Writes to the cache are buffered and written to disk on background with low priority.
// With a slow persistent storage, these buffers may grow when data is coming
// fast from the network. When the amount of unwritten data is exceeded, new
// writes will simply fail. We have two buckets, one for important data
// (priority) like html, css, fonts and js, and one for other data like images, video, etc.
user_pref("browser.cache.disk.max_chunks_memory_usage", 81920); // DEFAULT (40 MB)
user_pref("browser.cache.disk.max_priority_chunks_memory_usage", 81920); // DEFAULT (40 MB)

// PREF: how often to validate document in cache
// 0 = once-per-session
// 1 = each-time
// 2 = never
// 3 = when-appropriate/automatically (default)
user_pref("browser.cache.check_doc_frequency", 3); // DEFAULT

// PREF: enforce free space checks
// When smartsizing is disabled, we could potentially fill all disk space by
// cache data when the disk capacity is not set correctly. To avoid that, we
// check the free space every time we write some data to the cache. The free
// space is checked against two limits. Once the soft limit is reached we start
// evicting the least useful entries, when we reach the hard limit writing to
// the entry fails.
user_pref("browser.cache.disk.free_space_soft_limit", 81920); // default=5120 (5 MB)
user_pref("browser.cache.disk.free_space_hard_limit", 163840); // default=1024 (1 MB)

// PREF: compression level for cached JavaScript bytecode [FF102+]
// [1] https://github.com/yokoffing/Betterfox/issues/247
// 0 = do not compress (default)
// 1 = minimal compression
// 9 = maximal compression
user_pref("browser.cache.jsbc_compression_level", 3);

// PREF: strategy to use for when the bytecode should be encoded and saved [TESTING ONLY]
// -1 makes page load times marginally longer when a page is being loaded for the first time, while
// subsequent reload of websites will be much much faster.
// 0 means that the bytecode is created every 4 page loads [3].
// [1] https://searchfox.org/mozilla-release/source/modules/libpref/init/StaticPrefList.yaml#3461-3488
// [2] https://www.reddit.com/r/firefox/comments/12786yv/improving_performance_in_firefox_android_part_ii/
// [3] https://github.com/zen-browser/desktop/issues/217
// -1 = saved as soon as the script is seen for the first time, independently of the size or last access time
// 0 = saved in order to minimize the page-load time (default)
user_pref("dom.script_loader.bytecode_cache.enabled", true); // DEFAULT
user_pref("dom.script_loader.bytecode_cache.strategy", 0); // DEFAULT

/****************************************************************************
 * SECTION: MEMORY CACHE                                                   *
****************************************************************************/

// PREF: memory cache
// The "automatic" size selection (default) is based on a decade-old table
// that only contains settings for systems at or below 8GB of system memory [1].
// Waterfox G6 allows it to go above 8GB machines [3].
// Value can be up to the max size of an unsigned 64-bit integer.
// -1 = Automatically decide the maximum memory to use to cache decoded images,
// messages, and chrome based on the total amount of RAM
// For machines with 8GB+ RAM, that equals 32768 kb = 32 MB
// [1] https://kb.mozillazine.org/Browser.cache.memory.capacity#-1
// [2] https://searchfox.org/mozilla-central/source/netwerk/cache2/CacheObserver.cpp#94-125
// [3] https://github.com/WaterfoxCo/Waterfox/commit/3fed16932c80a2f6b37d126fe10aed66c7f1c214
user_pref("browser.cache.memory.capacity", 131072); // 128 MB RAM cache; alt=65536 (65 MB RAM cache); default=32768
user_pref("browser.cache.memory.max_entry_size", 40960); // 20 MB max entry; default=5120 (5 MB)

// PREF: amount of Back/Forward cached pages stored in memory for each tab
// Pages that were recently visited are stored in memory in such a way
// that they don't have to be re-parsed. This improves performance
// when pressing Back and Forward. This pref limits the maximum
// number of pages stored in memory. If you are not using the Back
// and Forward buttons that much, but rather using tabs, then there
// is no reason for Firefox to keep memory for this.
// -1=determine automatically (8 pages)
// [1] https://kb.mozillazine.org/Browser.sessionhistory.max_total_viewers#Possible_values_and_their_effects
user_pref("browser.sessionhistory.max_total_viewers", 4); // default=8
user_pref("browser.sessionstore.max_tabs_undo", 10); // default=25
user_pref("browser.sessionstore.max_entries", 10); // [HIDDEN OR REMOVED]
user_pref("dom.storage.default_quota", 40960); // 40MB; default=5120
user_pref("dom.storage.shadow_writes", true);

// PREF: tell garbage collector to start running when javascript is using xx MB of memory
// Garbage collection releases memory back to the system.
user_pref("javascript.options.mem.high_water_mark", 256); // DEFAULT [HIDDEN OR REMOVED]

/****************************************************************************
 * SECTION: MEDIA CACHE                                                     *
****************************************************************************/

// PREF: media disk cache
user_pref("media.cache_size", 4096000); // DEFAULT

// PREF: media memory cache
// [1] https://hg.mozilla.org/mozilla-central/file/tip/modules/libpref/init/StaticPrefList.yaml#l9652
// [2] https://github.com/arkenfox/user.js/pull/941#issuecomment-668278121
user_pref("media.memory_cache_max_size", 262144); // 256 MB; default=8192; AF=65536

// PREF: media cache combine sizes
user_pref("media.memory_caches_combined_limit_kb", 1048576); // 1GB; default=524288
user_pref("media.memory_caches_combined_limit_pc_sysmem", 10); // DEFAULT; alt=10; the percentage of system memory that Firefox can use for media caches

// PREF: Media Source Extensions (MSE) web standard
// Disabling MSE allows videos to fully buffer, but you're limited to 720p.
// [WARNING] Disabling MSE may break certain videos.
// false=Firefox plays the old WebM format
// true=Firefox plays the new WebM format (default)
// [1] https://support.mozilla.org/en-US/questions/1008271
user_pref("media.mediasource.enabled", true); // DEFAULT

// PREF: adjust video buffering periods when not using MSE (in seconds)
// [NOTE] Does not affect videos over 720p since they use DASH playback [1]
// [1] https://lifehacker.com/preload-entire-youtube-videos-by-disabling-dash-playbac-1186454034
user_pref("media.cache_readahead_limit", 600); // 10 min; default=60; stop reading ahead when our buffered data is this many seconds ahead of the current playback
user_pref("media.cache_resume_threshold", 300); // 5 min; default=30; when a network connection is suspended, don't resume it until the amount of buffered data falls below this threshold

/****************************************************************************
 * SECTION: IMAGE CACHE                                                     *
****************************************************************************/

// PREF: image cache
user_pref("image.cache.size", 10485760); // (cache images up to 10MiB in size) [DEFAULT 5242880]
user_pref("image.mem.decode_bytes_at_a_time", 65536); // default=16384; alt=32768; chunk size for calls to the image decoders
user_pref("image.mem.max_decoded_image_kb", 1024000); // 500MB [HIDDEN OR REMOVED?]

// PREF: set minimum timeout to unmap shared surfaces since they have been last used
// [NOTE] This is only used on 32-bit builds of Firefox where there is meaningful
// virtual address space pressure.
// [1] https://phabricator.services.mozilla.com/D109440
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1699224
user_pref("image.mem.shared.unmap.min_expiration_ms", 120000); // default=60000; minimum timeout to unmap shared surfaces since they have been last used

/****************************************************************************
 * SECTION: NETWORK                                                         *
****************************************************************************/

// PREF: use bigger packets
// [WARNING] Cannot open HTML files bigger than 4MB if value is too large [2].
// Reduce Firefox's CPU usage by requiring fewer application-to-driver data transfers.
// However, it does not affect the actual packet sizes transmitted over the network.
// [1] https://www.mail-archive.com/support-seamonkey@lists.mozilla.org/msg74561.html
// [2] https://github.com/yokoffing/Betterfox/issues/279
// [3] https://ra1ahq.blog/en/optimizaciya-proizvoditelnosti-mozilla-firefox
user_pref("network.buffer.cache.size", 65535); // default=32768 (32 kb); 262144 too large
user_pref("network.buffer.cache.count", 64); // default=24; 128 too large

// PREF: increase the absolute number of HTTP connections
// [1] https://kb.mozillazine.org/Network.http.max-connections
// [2] https://kb.mozillazine.org/Network.http.max-persistent-connections-per-server
// [3] https://www.reddit.com/r/firefox/comments/11m2yuh/how_do_i_make_firefox_use_more_of_my_900_megabit/jbfmru6/
user_pref("network.http.max-connections", 2048); // default=900
user_pref("network.http.max-persistent-connections-per-server", 2048); // default=6; download connections; anything above 10 is excessive
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 2048); // default=3
user_pref("network.http.max-persistent-connections-per-proxy", 2048); // default=32
user_pref("network.http.request.max-start-delay", 0); // default=10
user_pref("network.websocket.max-connections", 2048); // DEFAULT

// PREF: pacing requests [FF23+]
// Controls how many HTTP requests are sent at a time.
// Pacing HTTP requests can have some benefits, such as reducing network congestion,
// improving web page loading speed, and avoiding server overload.
// Pacing requests adds a slight delay between requests to throttle them.
// If you have a fast machine and internet connection, disabling pacing
// may provide a small speed boost when loading pages with lots of requests.
// false = Firefox will send as many requests as possible without pacing
// true = Firefox will pace requests (default)
user_pref("network.http.pacing.requests.enabled", false);
user_pref("network.http.pacing.requests.min-parallelism", 24); // default=6
user_pref("network.http.pacing.requests.burst", 48); // default=10

// PREF: increase DNS cache
// [1] https://developer.mozilla.org/en-US/docs/Web/Performance/Understanding_latency
user_pref("network.dnsCacheEntries", 10000); // default=800

// PREF: adjust DNS expiration time
// [ABOUT] about:networking#dns
// [NOTE] These prefs will be ignored by DNS resolver if using DoH/TRR.
user_pref("network.dnsCacheExpiration", 3600); // keep entries for 1 hour; default=60
user_pref("network.dnsCacheExpirationGracePeriod", 120); // default=60; cache DNS entries for 2 minutes after they expire

// PREF: the number of threads for DNS
user_pref("network.dns.max_high_priority_threads", 96); // DEFAULT [FF 123?]
user_pref("network.dns.max_any_priority_threads", 48); // DEFAULT [FF 123?]

// PREF: increase TLS token caching
user_pref("network.ssl_tokens_cache_capacity", 163840); // default=2048; more TLS token caching (fast reconnects)

/****************************************************************************
 * SECTION: SPECULATIVE LOADING                                            *
****************************************************************************/

// These are connections that are not explicitly asked for (e.g., clicked on).
// [1] https://developer.mozilla.org/en-US/docs/Web/Performance/Speculative_loading

// [NOTE] FF85+ partitions (isolates) pooled connections, prefetch connections,
// pre-connect connections, speculative connections, TLS session identifiers,
// and other connections. We can take advantage of the speed of pre-connections
// while preserving privacy. Users may relax hardening to maximize their preference.
// For more information, see SecureFox: "PREF: State Paritioning" and "PREF: Network Partitioning".
// [NOTE] To activate and increase network predictions, go to settings in uBlock Origin and uncheck:
// - "Disable pre-fetching (to prevent any connection for blocked network requests)"
// [NOTE] Add prefs to "MY OVERRIDES" section and uncomment to enable them in your user.js.

// PREF: link-mouseover opening connection to linked server
// When accessing content online, devices use sockets as endpoints.
// The global limit on half-open sockets controls how many speculative
// connection attempts can occur at once when starting new connections [3].
// If the user follows through, pages can load faster since some
// work was done in advance. Firefox opens predictive connections
// to sites when hovering over New Tab thumbnails or starting a
// URL Bar search [1] and hyperlinks within a page [2].
// [NOTE] DNS (if enabled), TCP, and SSL handshakes are set up in advance,
// but page contents are not downloaded until a click on the link is registered.
// [1] https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections?redirectslug=how-stop-firefox-automatically-making-connections&redirectlocale=en-US#:~:text=Speculative%20pre%2Dconnections
// [2] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests
// [3] https://searchfox.org/mozilla-central/rev/028c68d5f32df54bca4cf96376f79e48dfafdf08/modules/libpref/init/all.js#1280-1282
// [4] https://www.keycdn.com/blog/resource-hints#prefetch
// [5] https://3perf.com/blog/link-rels/#prefetch
user_pref("network.http.speculative-parallel-limit", 1024);

// PREF: DNS prefetching for HTMLLinkElement <link rel="dns-prefetch">
// Used for cross-origin connections to provide small performance improvements.
// You can enable rel=dns-prefetch for the HTTPS document without prefetching
// DNS for anchors, whereas the latter makes more specualtive requests [5].
// [1] https://bitsup.blogspot.com/2008/11/dns-prefetching-for-firefox.html
// [2] https://css-tricks.com/prefetching-preloading-prebrowsing/#dns-prefetching
// [3] https://www.keycdn.com/blog/resource-hints#2-dns-prefetching
// [4] http://www.mecs-press.org/ijieeb/ijieeb-v7-n5/IJIEEB-V7-N5-2.pdf
// [5] https://bugzilla.mozilla.org/show_bug.cgi?id=1596935#c28
user_pref("network.dns.disablePrefetch", false);
user_pref("network.dns.disablePrefetchFromHTTPS", false); // [FF127+ false]

// PREF: DNS prefetch for HTMLAnchorElement (speculative DNS)
// Disable speculative DNS calls to prevent Firefox from resolving
// hostnames for other domains linked on a page. This may eliminate
// unnecessary DNS lookups, but can increase latency when following external links.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1596935#c28
// [2] https://github.com/arkenfox/user.js/issues/1870#issuecomment-2220773972
user_pref("dom.prefetch_dns_for_anchor_http_document", true); // [FF128+]
user_pref("dom.prefetch_dns_for_anchor_https_document", true); // DEFAULT [FF128+]

// PREF: enable <link rel="preconnect"> tag and Link: rel=preconnect response header handling
user_pref("network.preconnect", true); // DEFAULT

// PREF: preconnect to the autocomplete URL in the address bar
// Whether to warm up network connections for autofill or search results.
// Firefox preloads URLs that autocomplete when a user types into the address bar.
// Connects to destination server ahead of time, to avoid TCP handshake latency.
// [NOTE] Firefox will perform DNS lookup (if enabled) and TCP and TLS handshake,
// but will not start sending or receiving HTTP data.
// [1] https://www.ghacks.net/2017/07/24/disable-preloading-firefox-autocomplete-urls/
user_pref("browser.urlbar.speculativeConnect.enabled", true);

// PREF: mousedown speculative connections on bookmarks and history [FF98+]
// Whether to warm up network connections for places:menus and places:toolbar.
user_pref("browser.places.speculativeConnect.enabled", true);

// PREF: network module preload <link rel="modulepreload"> [FF115+]
// High-priority loading of current page JavaScript modules.
// Used to preload high-priority JavaScript modules for strategic performance improvements.
// Module preloading allows developers to fetch JavaScript modules and dependencies
// earlier to accelerate page loads. The browser downloads, parses, and compiles modules
// referenced by links with this attribute in parallel with other resources, rather
// than sequentially waiting to process each. Preloading reduces overall download times.
// Browsers may also automatically preload dependencies without firing extra events.
// Unlike other pre-connection tags (except rel=preload), this tag is mandatory for the browser.
// [1] https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload
user_pref("network.modulepreload", true); // DEFAULT

// PREF: link prefetching <link rel="prefetch">
// Pre-populates the HTTP cache by prefetching same-site future navigation
// resources or subresources used on those pages.
// Enabling link prefetching allows Firefox to preload pages tagged as important.
// The browser prefetches links with the prefetch-link tag, fetching resources
// likely needed for the next navigation at low priority. When clicking a link
// or loading a new page, prefetching stops and discards hints. Prefetching
// downloads resources without executing them.
// [NOTE] Since link prefetch uses the HTTP cache, it has a number of issues
// with document prefetches, such as being potentially blocked by Cache-Control headers
// (e.g. cache partitioning).
// [1] https://developer.mozilla.org/en-US/docs/Glossary/Prefetch
// [2] http://www.mecs-press.org/ijieeb/ijieeb-v7-n5/IJIEEB-V7-N5-2.pdf
// [3] https://timkadlec.com/remembers/2020-06-17-prefetching-at-this-age/
// [4] https://3perf.com/blog/link-rels/#prefetch
// [5] https://developer.mozilla.org/docs/Web/HTTP/Link_prefetching_FAQ
user_pref("network.prefetch-next", true);

// PREF: Fetch Priority API [FF119+]
// Indicates whether the `fetchpriority` attribute for elements which support it.
// [1] https://web.dev/articles/fetch-priority
// [2] https://nitropack.io/blog/post/priority-hints
// [2] https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority
// [3] https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement/fetchPriority
user_pref("network.fetchpriority.enabled", true);

// PREF: early hints [FF120+]
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103
// [2] https://developer.chrome.com/blog/early-hints/
// [3] https://blog.cloudflare.com/early-hints/
// [4] https://blog.cloudflare.com/early-hints-performance/
user_pref("network.early-hints.enabled", true);

// PREF: `Link: rel=preconnect` in 103 Early Hint response [FF120+]
// Used to warm most critical cross-origin connections to provide
// performance improvements when connecting to them.
// [NOTE] When 0, this is limited by "network.http.speculative-parallel-limit".
user_pref("network.early-hints.preconnect.enabled", true);
user_pref("network.early-hints.preconnect.max_connections", 1024); // DEFAULT

// PREF: Network Predictor (NP)
// When enabled, it trains and uses Firefox's algorithm to preload page resource
// by tracking past page resources. It uses a local file (history) of needed images,
// scripts, etc. to request them preemptively when navigating.
// [NOTE] By default, it only preconnects DNS, TCP, and SSL handshakes.
// No data sends until clicking. With "network.predictor.enable-prefetch" enabled,
// it also performs prefetches.
// [1] https://wiki.mozilla.org/Privacy/Reviews/Necko
// [2] https://www.ghacks.net/2014/05/11/seer-disable-firefox/
// [3] https://github.com/dillbyrne/random-agent-spoofer/issues/238#issuecomment-110214518
// [4] https://www.igvita.com/posa/high-performance-networking-in-google-chrome/#predictor
user_pref("network.predictor.enabled", true); // [DEFAULT: false FF144+]

// PREF: Network Predictor fetch for resources ahead of time
// Prefetch page resources based on past user behavior.
user_pref("network.predictor.enable-prefetch", true); // [FF48+] [DEFAULT: false]

// PREF: make Network Predictor active when hovering over links
// When hovering over links, Network Predictor uses past resource history to
// preemptively request what will likely be needed instead of waiting for the document.
// Predictive connections automatically open when hovering over links to speed up
// loading, starting some work in advance.
user_pref("network.predictor.enable-hover-on-ssl", true); // DEFAULT

// PREF: assign Network Predictor confidence levels
// [NOTE] Keep in mind that Network Predictor must LEARN your browsing habits.
// Editing these lower will cause more speculative connections to occur,
// which reduces accuracy over time and has privacy implications.
user_pref("network.predictor.preresolve-min-confidence", 60); // DEFAULT
user_pref("network.predictor.preconnect-min-confidence", 90); // DEFAULT
user_pref("network.predictor.prefetch-min-confidence", 100); // DEFAULT

// PREF: other Network Predictor values
// [NOTE] Keep in mmind that Network Predictor must LEARN your browsing habits.
user_pref("network.predictor.prefetch-force-valid-for", 10); // DEFAULT; how long prefetched resources are considered valid and usable (in seconds) for the prediction modeling
user_pref("network.predictor.prefetch-rolling-load-count", 10); // DEFAULT; the maximum number of resources that Firefox will prefetch in memory at one time based on prediction modeling
user_pref("network.predictor.max-resources-per-entry", 250); // default=100
user_pref("network.predictor.max-uri-length", 1000); // default=500

/****************************************************************************
 * SECTION: EXPERIMENTAL                                                    *
****************************************************************************/

// PREF: CSS Masonry Layout [NIGHTLY]
// [1] https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout
// [2] https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/
user_pref("layout.css.grid-template-masonry-value.enabled", true);

/****************************************************************************
 * SECTION: TAB UNLOAD                                                      *
****************************************************************************/

// PREF: unload tabs on low memory
// [ABOUT] about:unloads
// Firefox will detect if your computer’s memory is running low (less than 200MB)
// and suspend tabs that you have not used in awhile.
// [1] https://support.mozilla.org/en-US/kb/unload-inactive-tabs-save-system-memory-firefox
// [2] https://hacks.mozilla.org/2021/10/tab-unloading-in-firefox-93/
user_pref("browser.tabs.unloadOnLowMemory", true); // DEFAULT

// PREF: determine when tabs unload [WINDOWS] [LINUX]
// Notify TabUnloader or send the memory pressure if the memory resource
// notification is signaled AND the available commit space is lower than
// this value (in MiB).
// Set this to some value, e.g. 4/5 of total memory available on your system:
// 4GB=3276, 8GB=6553, 16GB=13107, 32GB=25698, 64GB=52429
// [1] https://dev.to/msugakov/taking-firefox-memory-usage-under-control-on-linux-4b02
user_pref("browser.low_commit_space_threshold_mb", 25698); // default=200; WINDOWS LINUX

// PREF: determine when tabs unload [LINUX]
// On Linux, Firefox checks available memory in comparison to total memory,
// and use this percent value (out of 100) to determine if Firefox is in a
// low memory scenario.
// [1] https://dev.to/msugakov/taking-firefox-memory-usage-under-control-on-linux-4b02
user_pref("browser.low_commit_space_threshold_percent", 20); // default=5; LINUX

// PREF: determine how long (in ms) tabs are inactive before they unload
// 60000=1min; 300000=5min; 600000=10min (default)
user_pref("browser.tabs.min_inactive_duration_before_unload", 1200000); // 5min; default=600000

/****************************************************************************
 * SECTION: PROCESS COUNT                                                  *
****************************************************************************/

// PREF: process count
// [ABOUT] View in about:processes.
// With Firefox Quantum (2017), CPU cores = processCount. However, since the
// introduction of Fission [2], the number of website processes is controlled
// by processCount.webIsolated. Disabling fission.autostart or changing
// fission.webContentIsolationStrategy reverts control back to processCount.
// [1] https://www.reddit.com/r/firefox/comments/r69j52/firefox_content_process_limit_is_gone/
// [2] https://firefox-source-docs.mozilla.org/dom/ipc/process_model.html#web-content-processes
user_pref("dom.ipc.processCount", 12); // DEFAULT; Shared Web Content
user_pref("dom.ipc.processCount.webIsolated", 12); // default=4; Isolated Web Content
user_pref("dom.ipc.keepProcessesAlive.web", 12); // default=1 [HIDDEN OR REMOVED]

// PREF: use one process for process preallocation cache
user_pref("dom.ipc.processPrelaunch.fission.number", 12); // default=3; Process Preallocation Cache

user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("general.smoothScroll", true); // DEFAULT
user_pref("general.smoothScroll.msdPhysics.continuousMotionMaxDeltaMS", 12);
user_pref("general.smoothScroll.msdPhysics.enabled", true);
user_pref("general.smoothScroll.msdPhysics.motionBeginSpringConstant", 600);
user_pref("general.smoothScroll.msdPhysics.regularSpringConstant", 650);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaMS", 25);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaRatio", "2");
user_pref("general.smoothScroll.msdPhysics.slowdownSpringConstant", 250);
user_pref("general.smoothScroll.currentVelocityWeighting", "1");
user_pref("general.smoothScroll.stopDecelerationWeighting", "1");
user_pref("mousewheel.default.delta_multiplier_y", 300); // 250-400; adjust this number to your liking

/****************************************************************************
 * Securefox                                                                *
 * "Natura non contristatur"                                                *
 * priority: provide sensible security and privacy                          *
 * version: 146                                                             *
 * url: https://github.com/yokoffing/Betterfox                              *
 * credit: Most prefs are reproduced and adapted from the arkenfox project  *
 * credit urL: https://github.com/arkenfox/user.js                          *
****************************************************************************/

/****************************************************************************
 * SECTION: TRACKING PROTECTION                                             *
****************************************************************************/
// PREF: enable ETP Strict Mode [FF86+]
// ETP Strict Mode enables Total Cookie Protection (TCP)
// [NOTE] Adding site exceptions disables all ETP protections for that site and increases the risk of
// cross-site state tracking e.g. exceptions for SiteA and SiteB means PartyC on both sites is shared
// [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
// [2] https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop
// [3] https://www.reddit.com/r/firefox/comments/l7xetb/network_priority_for_firefoxs_enhanced_tracking/gle2mqn/?web2x&context=3
// [SETTING] to add site exceptions: Urlbar>ETP Shield
// [SETTING] to manage site exceptions: Options>Privacy & Security>Enhanced Tracking Protection>Manage Exceptions
user_pref("browser.contentblocking.category", "strict"); // [HIDDEN PREF]
user_pref("privacy.trackingprotection.enabled", true); // enabled with "Strict"
user_pref("privacy.trackingprotection.pbmode.enabled", true); // DEFAULT
user_pref("browser.contentblocking.customBlockList.preferences.ui.enabled", false); // DEFAULT
user_pref("privacy.trackingprotection.socialtracking.enabled", true); // enabled with "Strict"
user_pref("privacy.socialtracking.block_cookies.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.cryptomining.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.emailtracking.enabled", true); // enabled with "Strict"
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault", true); // DEFAULT
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.pbmode", true); // DEFAULT
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.pbmode.top_navigation", true); // DEFAULT
user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // enabled with "Strict"
user_pref("privacy.annotate_channels.strict_list.enabled", true); // enabled with "Strict"
user_pref("privacy.annotate_channels.strict_list.pbmode.enabled", true); // DEFAULT
user_pref("privacy.fingerprintingProtection", true); // [FF114+] [ETP FF119+] enabled with "Strict"
user_pref("privacy.fingerprintingProtection.pbmode", true); // DEFAULT
user_pref("privacy.bounceTrackingProtection.mode", 1); // [FF131+] [ETP FF133+]
// [1] https://searchfox.org/mozilla-central/source/toolkit/components/antitracking/bouncetrackingprotection/nsIBounceTrackingProtection.idl#11-23

// PREF: disable ETP web compat features (about:compat) [FF93+]
// [SETUP-HARDEN] Includes skip lists, heuristics (SmartBlock) and automatic grants
// Opener and redirect heuristics are granted for 30 days, see [3]
// [1] https://blog.mozilla.org/security/2021/07/13/smartblock-v2/
// [2] https://hg.mozilla.org/mozilla-central/rev/e5483fd469ab#l4.12
// [3] https://developer.mozilla.org/docs/Web/Privacy/State_Partitioning#storage_access_heuristics
user_pref("privacy.antitracking.enableWebcompat", false);

// PREF: set ETP Strict/Custom exception lists (FF141+)
// [SETTING] Options>Privacy & Security>Enhanced Tracking Protection>Strict/Custom>Fix major [baseline] | minor [convenience]
// [1] https://support.mozilla.org/en-US/kb/manage-enhanced-tracking-protection-exceptions
// [2] https://etp-exceptions.mozilla.org/
user_pref("privacy.trackingprotection.allow_list.baseline.enabled", true); // [DEFAULT: true]
user_pref("privacy.trackingprotection.allow_list.convenience.enabled", true); // [DEFAULT: true]

// PREF: query stripping
// Currently uses a small list [1]
// We set the same query stripping list that Brave and LibreWolf uses [2]
// If using uBlock Origin or AdGuard, use filter lists as well [3]
// Query parameters stripped [5]
// [1] https://www.eyerys.com/articles/news/how-mozilla-firefox-improves-privacy-using-query-parameter-stripping-feature
// [2] https://github.com/brave/brave-core/blob/f337a47cf84211807035581a9f609853752a32fb/browser/net/brave_site_hacks_network_delegate_helper.cc
// [3] https://github.com/yokoffing/filterlists#url-tracking-parameters
// [4] https://bugzilla.mozilla.org/show_bug.cgi?id=1706607
// [5] https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/query-stripping/records
user_pref("privacy.query_stripping.enabled", true); // enabled with "Strict"
user_pref("privacy.query_stripping.enabled.pbmode", true); // enabled with "Strict"
user_pref("privacy.query_stripping.strip_list", ""); // DEFAULT
user_pref("privacy.query_stripping.strip_on_share.enabled", true);

// PREF: Smartblock
// [1] https://support.mozilla.org/en-US/kb/smartblock-enhanced-tracking-protection
// [2] https://www.youtube.com/watch?v=VE8SrClOTgw
// [3] https://searchfox.org/mozilla-central/source/browser/extensions/webcompat/data/shims.js
user_pref("extensions.webcompat.enable_shims", true); // [HIDDEN] enabled with "Strict"
user_pref("extensions.webcompat.smartblockEmbeds.enabled", true); // [DEFAULT FF137+]

// PREF: allow embedded tweets and reddit posts [FF136+]
// [TEST - reddit embed] https://www.pcgamer.com/amazing-halo-infinite-bugs-are-already-rolling-in/
// [TEST - instagram embed] https://www.ndtv.com/entertainment/bharti-singh-and-husband-haarsh-limbachiyaa-announce-pregnancy-see-trending-post-2646359
// [TEST - tweet embed] https://www.newsweek.com/cryptic-tweet-britney-spears-shows-elton-john-collab-may-date-back-2015-1728036
// [TEST - tiktok embed] https://www.vulture.com/article/snl-adds-four-new-cast-members-for-season-48.html
// [TEST - truthsocial embed] https://www.newsweek.com/donald-trump-congratulates-patrick-brittany-mahomes-new-baby-2027097
// [1] https://www.reddit.com/r/firefox/comments/l79nxy/firefox_dev_is_ignoring_social_tracking_preference/gl84ukk
// [2] https://www.reddit.com/r/firefox/comments/pvds9m/reddit_embeds_not_loading/
// [3] https://github.com/yokoffing/Betterfox/issues/413
user_pref("urlclassifier.trackingSkipURLs", "*://embed.reddit.com/*,*://*.twitter.com/*,*://*.twimg.com/*"); // MANUAL
user_pref("urlclassifier.features.socialtracking.skipURLs", "*://*.twitter.com/*,*://*.twimg.com/*"); // MANUAL

// PREF: allow embedded tweets, Instagram and Reddit posts, and TikTok embeds [before FF136+]
user_pref("urlclassifier.trackingSkipURLs", "*.reddit.com, *.twitter.com, *.twimg.com, *.tiktok.com"); // MANUAL
user_pref("urlclassifier.features.socialtracking.skipURLs", "*.instagram.com, *.twitter.com, *.twimg.com"); // MANUAL

// PREF: lower the priority of network loads for resources on the tracking protection list [NIGHTLY]
// [1] https://github.com/arkenfox/user.js/issues/102#issuecomment-298413904
user_pref("privacy.trackingprotection.lower_network_priority", true);

// PREF: Site Isolation (sandboxing) [FF100+]
// [ABOUT] View in about:processes.
// Site Isolation (Fission) builds upon a new security architecture that extends current
// protection mechanisms by separating web content and loading each site
// in its own operating system process. This new security architecture allows
// Firefox to completely separate code originating from different sites and, in turn,
// defend against malicious sites trying to access sensitive information from other sites you are visiting.
// [1] https://hacks.mozilla.org/2021/05/introducing-firefox-new-site-isolation-security-architecture/
// [2] https://hacks.mozilla.org/2022/05/improved-process-isolation-in-firefox-100/
// [3] https://hacks.mozilla.org/2021/12/webassembly-and-back-again-fine-grained-sandboxing-in-firefox-95/
// [4] https://www.reddit.com/r/firefox/comments/r69j52/firefox_content_process_limit_is_gone/
// [5] https://hg.mozilla.org/mozilla-central/file/tip/dom/ipc/ProcessIsolation.cpp#l53
user_pref("fission.autostart", true); // DEFAULT [DO NOT TOUCH]
user_pref("fission.webContentIsolationStrategy", 1); // DEFAULT

// PREF: GPU sandboxing [FF110+] [WINDOWS]
// [1] https://www.ghacks.net/2023/01/17/firefox-110-will-launch-with-gpu-sandboxing-on-windows/
// [2] https://techdows.com/2023/02/disable-gpu-sandboxing-firefox.html
// 0=disabled, 1=enabled (default)
user_pref("security.sandbox.gpu.level", 1); // DEFAULT WINDOWS

// PREF: State Partitioning [Dynamic First-Party Isolation (dFPI), Total Cookie Protection (TCP)]
// Firefox manages client-side state (i.e., data stored in the browser) to mitigate the ability of websites to abuse state
// for cross-site tracking. This effort aims to achieve that by providing what is effectively a "different", isolated storage
// location to every website a user visits.
// dFPI is a more web-compatible version of FPI, which double keys all third-party state by the origin of the top-level
// context. dFPI isolates user's browsing data for each top-level eTLD+1, but is flexible enough to apply web
// compatibility heuristics to address resulting breakage by dynamically modifying a frame's storage principal.
// dFPI isolates most sites while applying heuristics to allow sites through the isolation in certain circumstances for usability.
// [NOTE] dFPI partitions all of the following caches by the top-level site being visited: HTTP cache, image cache,
// favicon cache, HSTS cache, OCSP cache, style sheet cache, font cache, DNS cache, HTTP Authentication cache,
// Alt-Svc cache, and TLS certificate cache.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1549587
// [2] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/State_Partitioning
// [3] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
// [4] https://blog.mozilla.org/en/mozilla/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/
// [5] https://hacks.mozilla.org/2021/02/introducing-state-partitioning/
// [6] https://github.com/arkenfox/user.js/issues/1281
// [7] https://hacks.mozilla.org/2022/02/improving-the-storage-access-api-in-firefox/
// [8] https://blog.includesecurity.com/2025/04/cross-site-websocket-hijacking-exploitation-in-2025/
user_pref("network.cookie.cookieBehavior", 5); // DEFAULT FF103+
user_pref("network.cookie.cookieBehavior.optInPartitioning", true); // [ETP FF132+]
user_pref("browser.contentblocking.reject-and-isolate-cookies.preferences.ui.enabled", true); // DEFAULT

// PREF: Network Partitioning
// Networking-related APIs are not intended to be used for websites to store data, but they can be abused for
// cross-site tracking. Network APIs and caches are permanently partitioned by the top-level site.
// Network Partitioning (isolation) will allow Firefox to associate resources on a per-website basis rather than together
// in the same pool. This includes cache, favicons, CSS files, images, and even speculative connections.
// [1] https://www.zdnet.com/article/firefox-to-ship-network-partitioning-as-a-new-anti-tracking-defense/
// [2] https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning#network_partitioning
// [3] https://blog.mozilla.org/security/2021/01/26/supercookie-protections/
user_pref("privacy.partition.network_state", true); // DEFAULT
user_pref("privacy.partition.serviceWorkers", true); // [DEFAULT: true FF105+]
user_pref("privacy.partition.network_state.ocsp_cache", true); // [DEFAULT: true FF123+]
user_pref("privacy.partition.bloburl_per_partition_key", true); // [FF118+]
// enable APS (Always Partitioning Storage) [FF104+]
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage", true); // [DEFAULT: true FF109+]
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage.exempt_sessionstorage", false); // [DEFAULT: false FF109+]

// PREF: Redirect Tracking Prevention / Cookie Purging
// All storage is cleared (more or less) daily from origins that are known trackers and that
// haven’t received a top-level user interaction (including scroll) within the last 45 days.
// [1] https://www.ghacks.net/2020/08/06/how-to-enable-redirect-tracking-in-firefox/
// [2] https://www.cookiestatus.com/firefox/#other-first-party-storage
// [3] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/Redirect_tracking_protection
// [4] https://www.ghacks.net/2020/03/04/firefox-75-will-purge-site-data-if-associated-with-tracking-cookies/
// [5] https://github.com/arkenfox/user.js/issues/1089
// [6] https://firefox-source-docs.mozilla.org/toolkit/components/antitracking/anti-tracking/cookie-purging/index.html
user_pref("privacy.purge_trackers.enabled", true); // DEFAULT

// PREF: SameSite Cookies
// Currently, the absence of the SameSite attribute implies that cookies will be
// attached to any request for a given origin, no matter who initiated that request.
// This behavior is equivalent to setting SameSite=None.
// So the pref allows the lack of attribution, or SameSite=None, only on HTTPS sites
// to prevent CSFRs on plaintext sites.
// [1] https://hacks.mozilla.org/2020/08/changes-to-samesite-cookie-behavior/
// [2] https://caniuse.com/?search=samesite
// [3] https://github.com/arkenfox/user.js/issues/1640#issuecomment-1464093950
// [4] https://support.mozilla.org/en-US/questions/1364032
// [5] https://blog.mozilla.org/security/2018/04/24/same-site-cookies-in-firefox-60/
// [6] https://web.dev/samesite-cookies-explained/
// [7] https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions
// [8] https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// [9] https://blog.includesecurity.com/2025/04/cross-site-websocket-hijacking-exploitation-in-2025/
// [TEST] https://samesite-sandbox.glitch.me/
user_pref("network.cookie.sameSite.laxByDefault", true);
user_pref("network.cookie.sameSite.noneRequiresSecure", true); // [DEFAULT FF131+]
user_pref("network.cookie.sameSite.schemeful", true);

// PREF: Hyperlink Auditing (click tracking)
user_pref("browser.send_pings", reuw); // DEFAULT

// PREF: Beacon API
// Allows websites to asynchronously transmit small amounts of data to servers
// without impacting page load performance. This allows things like activity tracking
// to be done reliably in the background. Other tracking methods like form submissions
// and XHR requests already allow similar capabilities but hurt performance.
// Disabling the Beacon API wouldn't make the data unavailable - sites could still
// collect it synchronously instead.
// [NOTE] Disabling this API sometimes causes site breakage.
// [TEST] https://vercel.com/
// [1] https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon
// [2] https://github.com/arkenfox/user.js/issues/1586
user_pref("beacon.enabled", true);

// PREF: battery status tracking
// [NOTE] Pref remains, but API is depreciated.
// [1] https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API#browser_compatibility
user_pref("dom.battery.enabled", false);

// PREF: remove temp files opened from non-PB windows with an external application
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=302433,1738574
// [2] https://github.com/arkenfox/user.js/issues/1732
// [3] https://bugzilla.mozilla.org/302433
user_pref("browser.download.start_downloads_in_tmp_dir", true); // [FF102+]
user_pref("browser.helperApps.deleteTempFileOnExit", true); // DEFAULT [FF108]

// PREF: disable UITour backend
// This way, there is no chance that a remote page can use it.
user_pref("browser.uitour.enabled", false);
user_pref("browser.uitour.url", "");

// PREF: disable remote debugging
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16222
user_pref("devtools.debugger.remote-enabled", false); // DEFAULT

// PREF: Global Privacy Control (GPC) [FF118+]
// A privacy signal that tells the websites that the user
// doesn’t want to be tracked and doesn’t want their data to be sold.
// Honored by many highly ranked sites [3].
// [SETTING] Privacy & Security > Website Privacy Preferences > Tell websites not to sell or share my data
// [TEST] https://global-privacy-control.glitch.me/
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1830623
// [2] https://globalprivacycontrol.org/press-release/20201007.html
// [3] https://github.com/arkenfox/user.js/issues/1542#issuecomment-1279823954
// [4] https://blog.mozilla.org/netpolicy/2021/10/28/implementing-global-privacy-control/
// [5] https://help.duckduckgo.com/duckduckgo-help-pages/privacy/gpc/
// [6] https://brave.com/web-standards-at-brave/4-global-privacy-control/
// [7] https://www.eff.org/gpc-privacy-badger
// [8] https://www.eff.org/issues/do-not-track
user_pref("privacy.globalprivacycontrol.enabled", true);
user_pref("privacy.globalprivacycontrol.functionality.enabled", true); // [FF120+]
user_pref("privacy.globalprivacycontrol.pbmode.enabled", true); // [FF120+]

/****************************************************************************
 * SECTION: OSCP & CERTS / HPKP (HTTP Public Key Pinning)                   *
****************************************************************************/

// Online Certificate Status Protocol (OCSP)
// OCSP leaks your IP and domains you visit to the CA when OCSP Stapling is not available on visited host.
// OCSP is vulnerable to replay attacks when nonce is not configured on the OCSP responder.
// Short-lived certificates are not checked for revocation (security.pki.cert_short_lifetime_in_days, default:10).
// Firefox falls back on plain OCSP when must-staple is not configured on the host certificate.
// [1] https://scotthelme.co.uk/revocation-is-broken/
// [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// [3] https://github.com/arkenfox/user.js/issues/1576#issuecomment-1304590235

// PREF: disable OCSP fetching to confirm current validity of certificates
// OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority).
// It's a trade-off between security (checking) and privacy (leaking info to the CA).
// Unlike Chrome, Firefox’s default settings also query OCSP responders to confirm the validity
// of SSL/TLS certificates. However, because OCSP query failures are so common, Firefox
// (like other browsers) implements a “soft-fail” policy.
// [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
// [SETTING] Privacy & Security>Security>Certificates>Query OCSP responder servers...
// [1] https://en.wikipedia.org/wiki/Ocsp
// [2] https://www.ssl.com/blogs/how-do-browsers-handle-revoked-ssl-tls-certificates/#ftoc-heading-3
// 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
user_pref("security.OCSP.enabled", 1);

// PREF: set OCSP fetch failures to hard-fail
// When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
// Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
// It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
// could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
// [WARNING] Expect breakage:
// security.OCSP.require will make the connection fail when the OCSP responder is unavailable
// security.OCSP.require is known to break browsing on some captive portals
// [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// [2] https://www.imperialviolet.org/2014/04/19/revchecking.html
// [3] https://www.ssl.com/blogs/how-do-browsers-handle-revoked-ssl-tls-certificates/#ftoc-heading-3
// [4] https://letsencrypt.org/2024/12/05/ending-ocsp/
user_pref("security.OCSP.require", true);

// PREF: CRLite
// CRLite covers valid certs, and it doesn't fall back to OCSP in mode 2 [FF84+].
// CRLite is faster and more private than OCSP [2].
// 0 = disabled
// 1 = consult CRLite but only collect telemetry
// 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results (default)
// 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" (removed FF145)
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985,1753071
// [2] https://blog.mozilla.org/security/tag/crlite/
user_pref("security.remote_settings.crlite_filters.enabled", true); // [DEFAULT: true FF137+]
user_pref("security.pki.crlite_mode", 2); // [DEFAULT: 2 FF142+]

// PREF: HTTP Public Key Pinning (HPKP)
// HPKP enhances the security of SSL certificates by associating
// a host with their expected public key. It prevents attackers
// from impersonating the host using fraudulent certificates,
// even if they hold a valid certificate from a trusted certification authority.
// HPKP ensures that the client maintains a secure connection with
// the correct server, thereby reducing the risk of man-in-the-middle (MITM) attacks.
// [NOTE] If you rely on an antivirus to protect your web browsing
// by inspecting ALL your web traffic, then leave at 1.
// [ERROR] MOZILLA_PKIX_ERROR_KEY_PINNING_FAILURE
// By default, pinning enforcement is not applied if a user-installed
// certificate authority (CA) is present. However, this allows user-installed
// CAs to override pins for any site, negating the security benefits of HPKP.
// 0=disabled, 1=allow user MiTM (such as your antivirus) (default), 2=strict
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1168603
// [3] https://github.com/yokoffing/Betterfox/issues/53#issuecomment-1035554783
user_pref("security.cert_pinning.enforcement_level", 2);

// PREF: do not trust installed third-party root certificates [FF120+]
// Disable Enterprise Root Certificates of the operating system.
// For users trying to get intranet sites on managed networks,
// or who have security software configured to analyze web traffic.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1848815
user_pref("security.enterprise_roots.enabled", false);
user_pref("security.certerrors.mitm.auto_enable_enterprise_roots", false);

// PREF: disable content analysis by Data Loss Prevention (DLP) agents [FF124+]
// DLP agents are background processes on managed computers that
// allow enterprises to monitor locally running applications for
// data exfiltration events, which they can allow/block based on
// customer-defined DLP policies.
// [1] https://github.com/chromium/content_analysis_sdk
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1880314
user_pref("browser.contentanalysis.enabled", false); // [FF121+] [DEFAULT]
user_pref("browser.contentanalysis.default_result", 0; // [FF127+] [DEFAULT]

// PREF: disable referrer and storage access for resources injected by content scripts [FF139+]
user_pref("privacy.antitracking.isolateContentScriptResources", true);

// PREF: disable CSP Level 2 Reporting [FF140+]
// [1] https://github.com/yokoffing/Betterfox/issues/415
user_pref("security.csp.reporting.enabled", false);

/****************************************************************************
 * SECTION: SSL (Secure Sockets Layer) / TLS (Transport Layer Security)    *
****************************************************************************/

// PREF: display warning on the padlock for "broken security"
// [NOTE] Warning padlock not indicated for subresources on a secure page! [2]
// [1] https://wiki.mozilla.org/Security:Renegotiation
// [2] https://bugzilla.mozilla.org/1353705
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);

// PREF: require safe negotiation
// [ERROR] SSL_ERROR_UNSAFE_NEGOTIATION
// [WARNING] Breaks ea.com login (Sep 2023).
// Blocks connections to servers that don't support RFC 5746 [2]
// as they're potentially vulnerable to a MiTM attack [3].
// A server without RFC 5746 can be safe from the attack if it
// disables renegotiations but the problem is that the browser can't
// know that. Setting this pref to true is the only way for the
// browser to ensure there will be no unsafe renegotiations on
// the channel between the browser and the server.
// [STATS] SSL Labs > Renegotiation Support (May 2024) reports over 99.7% of top sites have secure renegotiation [4].
// [1] https://wiki.mozilla.org/Security:Renegotiation
// [2] https://datatracker.ietf.org/doc/html/rfc5746
// [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
// [4] https://www.ssllabs.com/ssl-pulse/
user_pref("security.ssl.require_safe_negotiation", true);

// PREF: display advanced information on Insecure Connection warning pages
// [TEST] https://expired.badssl.com/
user_pref("browser.xul.error_pages.expert_bad_cert", true);

// PREF: disable 0-RTT (round-trip time) to improve TLS 1.3 security [FF51+]
// This data is not forward secret, as it is encrypted solely under keys derived using
// the offered PSK. There are no guarantees of non-replay between connections.
// [1] https://github.com/tlswg/tls13-spec/issues/1001
// [2] https://www.rfc-editor.org/rfc/rfc9001.html#name-replay-attacks-with-0-rtt
// [3] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/
user_pref("security.tls.enable_0rtt_data", true);

// PREF: enable hybrid post-quantum key exchange
// [1] https://pq.cloudflareresearch.com
// [2] https://github.com/zen-browser/desktop/pull/2275
user_pref("security.tls.enable_kyber", true);
user_pref("network.http.http3.enable_kyber", true);

/****************************************************************************
 * SECTION: FINGERPRINT PROTECTION (FPP)                                    *
****************************************************************************/

// PREF: enable FingerPrint Protection (FPP) [WiP]
// [1] https://github.com/arkenfox/user.js/issues/1661
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1816064
user_pref("privacy.resistFingerprinting.randomization.daily_reset.enabled", true);
user_pref("privacy.resistFingerprinting.randomization.daily_reset.private.enabled", true);

/****************************************************************************
 * SECTION: RESIST FINGERPRINTING (RFP)                                     *
****************************************************************************/

// PREF: enable advanced fingerprinting protection (RFP)
// [WARNING] Leave disabled unless you're okay with all the drawbacks
// [1] https://librewolf.net/docs/faq/#what-are-the-most-common-downsides-of-rfp-resist-fingerprinting
// [2] https://www.reddit.com/r/firefox/comments/wuqpgi/comment/ile3whx/?context=3
//user_pref("privacy.resistFingerprinting", true);

// PREF: set new window size rounding max values [FF55+]
// [SETUP-CHROME] sizes round down in hundreds: width to 200s and height to 100s, to fit your screen
// [1] https://bugzilla.mozilla.org/1330882
//user_pref("privacy.window.maxInnerWidth", 1600);
//user_pref("privacy.window.maxInnerHeight", 900);

// PREF: disable showing about:blank as soon as possible during startup [FF60+]
// [1] https://github.com/arkenfox/user.js/issues/1618
// [2] https://bugzilla.mozilla.org/1448423
//user_pref("browser.startup.blankWindow", false);

// PREF: disable ICC color management
// Use a color calibrator for best results [WINDOWS]
// Also may help improve font rendering on WINDOWS
// [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors
// default=false NON-WINDOWS
// [1] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/3.5/ICC_color_correction_in_Firefox
//user_pref("browser.display.use_system_colors", false);

/****************************************************************************
 * SECTION: DISK AVOIDANCE                                                  *
****************************************************************************/

// PREF: set media cache in Private Browsing to in-memory
// [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true);

// PREF: minimum interval (in ms) between session save operations
// Firefox periodically saves the user's session so it can restore
// their most recent tabs and windows if the browser crashes or restarts.
// The value sets the minimum time between these session save operations.
// Firefox only saves session data when the state has changed since the last save [2].
// Work has been done to mitigate potential performance drawbacks of frequent session saving [3].
// [1] https://kb.mozillazine.org/Browser.sessionstore.interval
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1304389#c64
// [3] https://bugzilla.mozilla.org/show_bug.cgi?id=1304389#c66
user_pref("browser.sessionstore.interval", 60000); // 1 minute; default=15000 (15s); 900000=15 min; 1800000=30 min

// PREF: store extra session data when crashing or restarting to install updates
// Dictates whether sites may save extra session data such as form content,
// scrollbar positions, and POST data.
// 0=everywhere (default), 1=unencrypted sites, 2=nowhere
//user_pref("browser.sessionstore.privacy_level", 2);

// PREF: disable automatic Firefox start and session restore after reboot [WINDOWS]
// [1] https://bugzilla.mozilla.org/603903
//user_pref("toolkit.winRegisterApplicationRestart", false);

// PREF: disable favicons in shortcuts [WINDOWS]
// Fetches and stores favicons for Windows .URL shortcuts created by drag and drop
// [NOTE] .URL shortcut files will be created with a generic icon.
// Favicons are stored as .ico files in profile_dir\shortcutCache.
//user_pref("browser.shell.shortcutFavicons", false);

// PREF: disable page thumbnails capturing
// Page thumbnails are only used in chrome/privileged contexts.
//user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]

/******************************************************************************
 * SECTION: SANITIZE HISTORY                                                  *
******************************************************************************/

// PREF: reset default 'Time range to clear' for "Clear Data" and "Clear History"
// Firefox remembers your last choice. This will reset the value when you start Firefox.
// 0=everything, 1=last hour, 2=last two hours, 3=last four hours,
// 4=today, 5=last five minutes, 6=last twenty-four hours
// The values 5 + 6 are not listed in the dropdown, which will display a
// blank value if they are used, but they do work as advertised.
//user_pref("privacy.sanitize.timeSpan", 0);

// PREF: sanitize site data: set manual "Clear Data" items [FF128+]
// Firefox remembers your last choices. This will reset them when you start Firefox
// [SETTING] Privacy & Security>Browser Privacy>Cookies and Site Data>Clear Data
//user_pref("privacy.clearSiteData.cache", true);
//user_pref("privacy.clearSiteData.cookiesAndStorage", false); // keep false until it respects "allow" site exceptions
//user_pref("privacy.clearSiteData.historyFormDataAndDownloads", true);
    //user_pref("privacy.clearSiteData.siteSettings", false);

// PREF: sanitize history: set manual "Clear History" items, also via Ctrl-Shift-Del | clearHistory migration is FF128+
// Firefox remembers your last choices. This will reset them when you start Firefox.
// [NOTE] Regardless of what you set "downloads" to, as soon as the dialog
// for "Clear Recent History" is opened, it is synced to the same as "history".
// [SETTING] Privacy & Security>History>Custom Settings>Clear History
//user_pref("privacy.cpd.cache", true); // [DEFAULT]
//user_pref("privacy.clearHistory.cache", true);
//user_pref("privacy.cpd.formdata", true); // [DEFAULT]
//user_pref("privacy.cpd.history", true); // [DEFAULT]
    //user_pref("privacy.cpd.downloads", true); // not used; see note above
//user_pref("privacy.clearHistory.historyFormDataAndDownloads", true);
//user_pref("privacy.cpd.cookies", false);
//user_pref("privacy.cpd.sessions", true); // [DEFAULT]
//user_pref("privacy.cpd.offlineApps", false); // [DEFAULT]
//user_pref("privacy.clearHistory.cookiesAndStorage", false);
    //user_pref("privacy.cpd.openWindows", false); // Session Restore
   //user_pref("privacy.cpd.passwords", false);
   //user_pref("privacy.cpd.siteSettings", false);
   //user_pref("privacy.clearHistory.siteSettings", false);

// PREF: purge session icon in Private Browsing windows
user_pref("browser.privatebrowsing.resetPBM.enabled", true);

// PREF: delete files downloaded in Private Browsing when all private windows are closed
// When downloading a file in private browsing mode, the user will be prompted
// to chose whether they want to keep or delete files that are downloaded
// while in private browsing.
//user_pref("browser.download.enableDeletePrivate", true);
//user_pref("browser.download.deletePrivateChosen", true);
//user_pref("browser.download.deletePrivate", true);

/******************************************************************************
 * SECTION: SHUTDOWN & SANITIZING                                             *
******************************************************************************/

// PREF: set History section to show all options
// Settings>Privacy>History>Use custom settings for history
// [INFOGRAPHIC] https://bugzilla.mozilla.org/show_bug.cgi?id=1765533#c1
user_pref("privacy.history.custom", true);

// PREF: clear browsing data on shutdown, while respecting site exceptions
// Set cookies, site data, cache, etc. to clear on shutdown.
// [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings
// [NOTE] "sessions": Active Logins: refers to HTTP Basic Authentication [1], not logins via cookies
// [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
// Clearing "offlineApps" may affect login items after browser restart [2].
// [1] https://en.wikipedia.org/wiki/Basic_access_authentication
// [2] https://github.com/arkenfox/user.js/issues/1291
// [3] https://github.com/yokoffing/Betterfox/issues/272
//user_pref("privacy.sanitize.sanitizeOnShutdown", true);

// PREF: sanitize on shutdown: no site exceptions | v2 migration [FF128+]
// [NOTE] If "history" is true, downloads will also be cleared.
//user_pref("privacy.clearOnShutdown.cache", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown_v2.cache", true); // [FF128+] [DEFAULT]
//user_pref("privacy.clearOnShutdown.downloads", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.formdata", true);  // [DEFAULT]
//user_pref("privacy.clearOnShutdown.history", true);   // [DEFAULT]
//user_pref("privacy.clearOnShutdown_v2.historyFormDataAndDownloads", true); // [FF128+] [DEFAULT]
    //user_pref("privacy.clearOnShutdown.siteSettings", false); // [DEFAULT]
    //user_pref("privacy.clearOnShutdown_v2.siteSettings", false); // [FF128+] [DEFAULT]

// PREF: set Session Restore to clear on shutdown [FF34+]
// [NOTE] Not needed if Session Restore is not used or it is already cleared with history (2811)
// [NOTE] However, if true, this pref prevents resuming from crashes.
//user_pref("privacy.clearOnShutdown.openWindows", true);

// PREF: sanitize on shutdown: respects allow site exceptions | v2 migration [FF128+]
// Set cookies, site data, cache, etc. to clear on shutdown.
// [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings
// [NOTE] "sessions": Active Logins (has no site exceptions): refers to HTTP Basic Authentication [1], not logins via cookies.
// [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache).
// Clearing "offlineApps" may affect login items after browser restart.
// [1] https://en.wikipedia.org/wiki/Basic_access_authentication
//user_pref("privacy.clearOnShutdown.cookies", true); // Cookies
//user_pref("privacy.clearOnShutdown.offlineApps", true); // Site Data
//user_pref("privacy.clearOnShutdown.sessions", true);  // Active Logins [DEFAULT]
//user_pref("privacy.clearOnShutdown_v2.cookiesAndStorage", true); // Cookies, Site Data, Active Logins [FF128+]

// PREF: configure site exceptions
// [NOTE] Currently, there is no way to add sites via about:config.
// [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow (when on the website in question)
// [SETTING] To manage site exceptions: Options>Privacy & Security>Cookies & Site Data>Manage Exceptions
// [NOTE] Exceptions: A "cookie" permission also controls "offlineApps" (see note below). For cross-domain logins,
// add exceptions for both sites e.g. https://www.youtube.com (site) + https://accounts.google.com (single sign on)
// [WARNING] Be selective with what cookies you keep, as they also disable partitioning [1]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1767271

/******************************************************************************
 * SECTION: SEARCH / URL BAR                                                 *
******************************************************************************/

// PREF: darken certain parts of the URL [FF75+]
// Makes the domain name more prominent by graying out other parts of the URL.
// Also hidse https:// and www parts from the suggestion URL.
// [1] https://udn.realityripple.com/docs/Mozilla/Preferences/Preference_reference/browser.urlbar.trimURLs
// [2] https://winaero.com/firefox-75-strips-https-and-www-from-address-bar-results/
user_pref("browser.urlbar.trimURLs", true); // DEFAULT

// PREF: trim HTTPS from the URL bar [FF119+]
// Firefox will hide https:// from the address bar, but not subdomains like www.
// It saves some space. Betterfox already uses HTTPS-by-Default and insecure sites
// get a padlock with a red stripe. Copying the URL still copies the scheme,
// so it's not like we need to see https. It's not a privacy issue, so you can add to your overrides.
// [TEST] http://www.http2demo.io/
// [1] https://www.ghacks.net/2023/09/19/firefox-119-will-launch-with-an-important-address-bar-change/
user_pref("browser.urlbar.trimHttps", true);
user_pref("browser.urlbar.untrimOnUserInteraction.featureGate", true);

// PREF: display "Not Secure" text on HTTP sites
// Needed with HTTPS-First Policy; not needed with HTTPS-Only Mode.
//user_pref("security.insecure_connection_text.enabled", true); // [DEFAULT FF136+]
//user_pref("security.insecure_connection_text.pbmode.enabled", true); // [DEFAULT FF136+]

// PREF: do not show search terms in URL bar [FF110+]
// Show search query instead of URL on search results pages.
// [SETTING] Search>Search Bar>Use the address bar for search and navigation>Show search terms instead of URL...
//user_pref("browser.urlbar.showSearchTerms.enabled", false);
    //user_pref("browser.urlbar.showSearchTerms.featureGate", false); // DEFAULT

// PREF: enable seperate search engine for Private Windows
// [SETTINGS] Preferences>Search>Default Search Engine>"Use this search engine in Private Windows"
user_pref("browser.search.separatePrivateDefault.ui.enabled", true);
// [SETTINGS] "Choose a different default search engine for Private Windows only"
    //user_pref("browser.search.separatePrivateDefault", true); // DEFAULT

// PREF: enable option to add custom search engine
// Before FF140, this pref was hidden.
// [SETTINGS] Settings -> Search -> Search Shortcuts -> Add
// [EXAMPLE] https://search.brave.com/search?q=%s
// [EXAMPLE] https://lite.duckduckgo.com/lite/?q=%s
// [1] https://reddit.com/r/firefox/comments/xkzswb/adding_firefox_search_engine_manually/
// [2] https://www.mozilla.org/en-US/firefox/140.0/releasenotes/
user_pref("browser.urlbar.update2.engineAliasRefresh", true); // [DEFAULT FF140+]

// PREF: disable live search suggestions (Google, Bing, etc.)
// [WARNING] Search engines keylog every character you type from the URL bar.
// Override these if you trust and use a privacy respecting search engine.
// [NOTE] Both prefs must be true for live search to work in the location bar.
// [SETTING] Search>Provide search suggestions > Show search suggestions in address bar result
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.search.suggest.enabled.private", false); // DEFAULT

// PREF: disable Show recent searches
// [SETTING] Search > Search Suggestions > Show recent searches
user_pref("browser.urlbar.suggest.recentsearches", true);

// PREF: disable Firefox Suggest
// [1] https://github.com/arkenfox/user.js/issues/1257
user_pref("browser.urlbar.quicksuggest.enabled", true); // controls whether the UI is shown
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", true); // [FF92+]
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", true); // [FF95+]
// hide Firefox Suggest label in URL dropdown box
user_pref("browser.urlbar.groupLabels.enabled", true);

// PREF: disable search and form history
// Be aware that autocomplete form data can be read by third parties [1][2].
// Form data can easily be stolen by third parties.
// [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
// [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
// [2] https://bugzilla.mozilla.org/381681
user_pref("browser.formfill.enable", false);

// PREF: URL bar domain guessing
// Domain guessing intercepts DNS "hostname not found errors" and resends a
// request (e.g. by adding www or .com). This is inconsistent use (e.g. FQDNs), does not work
// via Proxy Servers (different error), is a flawed use of DNS (TLDs: why treat .com
// as the 411 for DNS errors?), privacy issues (why connect to sites you didn't
// intend to), can leak sensitive data (e.g. query strings: e.g. Princeton attack),
// and is a security risk (e.g. common typos & malicious sites set up to exploit this).
user_pref("browser.fixup.alternate.enabled", true); // [DEFAULT FF104+]

// PREF: disable location bar autofill
// https://support.mozilla.org/en-US/kb/address-bar-autocomplete-firefox#w_url-autocomplete
user_pref("browser.urlbar.autoFill", true);

// PREF: enforce Punycode for Internationalized Domain Names to eliminate possible spoofing
// Firefox has some protections, but it is better to be safe than sorry.
// [!] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded.
// [EXAMPLE] https://www.techspot.com/news/100555-malvertising-attack-uses-punycode-character-spread-malware-through.html
// [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
// [1] https://wiki.mozilla.org/IDN_Display_Algorithm
// [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
// [3] CVE-2017-5383: https://www.mozilla.org/security/advisories/mfsa2017-02/
// [4] https://www.xudongz.com/blog/2017/idn-phishing/
user_pref("network.IDN_show_punycode", true);

/******************************************************************************
 * SECTION: HTTPS-FIRST POLICY                          *
******************************************************************************/
// PREF: HTTPS-First Policy
// Firefox attempts to make all connections to websites secure,
// and falls back to insecure connections only when a website
// does not support it. Unlike HTTPS-Only Mode, Firefox
// will NOT ask for your permission before connecting to a website
// that doesn’t support secure connections.
// As of October 2025, Google estimates that 3-5% of traffic
// is insecure, allowing attackers to eavesdrop on or change that data [8].
// [NOTE] HTTPS-Only Mode needs to be disabled for HTTPS First to work.
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ [no upgrade]
// [1] https://blog.mozilla.org/security/2021/08/10/firefox-91-introduces-https-by-default-in-private-browsing/
// [2] https://brave.com/privacy-updates/22-https-by-default/
// [3] https://github.com/brave/adblock-lists/blob/master/brave-lists/https-upgrade-exceptions-list.txt
// [4] https://web.dev/why-https-matters/
// [5] https://www.cloudflare.com/learning/ssl/why-use-https/
// [6] https://blog.chromium.org/2023/08/towards-https-by-default.html
// [7] https://attackanddefense.dev/2025/03/31/https-first-in-firefox-136.html
// [8] https://security.googleblog.com/2025/10/https-by-default.html
//user_pref("dom.security.https_first", true); // [DEFAULT FF136+]
//user_pref("dom.security.https_first_pbm", true); // [DEFAULT FF91+]
//user_pref("dom.security.https_first_schemeless", true); // [FF120+] [DEFAULT FF129+]

// PREF: block insecure passive content (images) on HTTPS pages
// [WARNING] This preference blocks all mixed content, including upgradable.
// Firefox still attempts an HTTP connection if it can't find a secure one,
// even with HTTPS First Policy. Although rare, this leaves a small risk of
// a malicious image being served through a MITM attack.
// Disable this pref if using HTTPS-Only Mode.
// [NOTE] Enterprise users may need to enable this setting [1].
// [1] https://blog.mozilla.org/security/2024/06/05/firefox-will-upgrade-more-mixed-content-in-version-127/
//user_pref("security.mixed_content.block_display_content", true); // Defense-in-depth (see HTTPS-Only mode)

/******************************************************************************
 * SECTION: HTTPS-ONLY MODE                              *
******************************************************************************/

// Firefox displays a warning page if HTTPS is not supported
// by a server. Options to use HTTP are then provided.
// [NOTE] When "https_only_mode" (all windows) is true,
// "https_only_mode_pbm" (private windows only) is ignored.
// As of October 2025, Google estimates that 3-5% of traffic
// is insecure, allowing attackers to eavesdrop on or change that data [6].
// [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On/Off/Off temporarily
// [SETTING] Privacy & Security>HTTPS-Only Mode
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ [no upgrade]
// [1] https://bugzilla.mozilla.org/1613063
// [2] https://blog.mozilla.org/security/2020/11/17/firefox-83-introduces-https-only-mode/
// [3] https://web.dev/why-https-matters/
// [4] https://www.cloudflare.com/learning/ssl/why-use-https/
// [5] https://blog.chromium.org/2023/08/towards-https-by-default.html
// [6] https://security.googleblog.com/2025/10/https-by-default.html

// PREF: enable HTTPS-Only mode in all windows
// When the top-level is HTTPS, insecure subresources are also upgraded (silent fail)
// [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On (after "Continue to HTTP Site")
// [SETTING] Privacy & Security>HTTPS-Only Mode (and manage exceptions)
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ | http://http.rip [no upgrade]
user_pref("dom.security.https_only_mode", true); // [FF76+]
user_pref("dom.security.https_only_mode_pbm", true); // [FF80+] Private Browsing windows only

// PREF: offer suggestion for HTTPS site when available
// [1] https://x.com/leli_gibts_scho/status/1371463866606059528
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);

// PREF: HTTP background requests in HTTPS-only Mode
// When attempting to upgrade, if the server doesn't respond within a few seconds,
// Firefox sends HTTP requests in order to check if the server supports HTTPS or not.
// This is done to avoid waiting for a timeout which takes 90 seconds.
// Firefox only sends top level domain when falling back to http.
// [WARNING] Disabling causes long timeouts when no path to HTTPS is present.
// [NOTE] Use "Manage Exceptions" for sites known for no HTTPS.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945
// [2] https://blog.mozilla.org/attack-and-defense/2021/03/10/insights-into-https-only-mode/
user_pref("dom.security.https_only_mode_send_http_background_request", true); // DEFAULT

/******************************************************************************
 * SECTION: DNS-over-HTTPS                                                    *
******************************************************************************/

// PREF: DNS-over-HTTPS (DoH) implementation
// [NOTE] Mode 3 has site exceptions with a nice UI on the error page.
// [SETTINGS] Privacy & Security > DNS over HTTPS > Enable secure DNS using:
// [NOTE] Mode 3 has site-exceptions with a nice UI on the error page.
// [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
// [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
// [3] https://support.mozilla.org/en-US/kb/dns-over-https#w_protection-levels-explained
// 0= Default Protection: Firefox decides when to use secure DNS (default)
// 2= Increased Protection: use DoH and fall back to native DNS if necessary
// 3= Max Protection: only use DoH; do not fall back to native DNS
// 5= Off: disable DoH
user_pref("network.trr.mode", 3); // DEFAULT

// PREF: lower max attempts to use DoH
// If DNS requests take too long, FF will fallback to your default DNS much quicker.
user_pref("network.trr.max-fails", 5); // default=15

// PREF: display fallback warning page [FF115+]
// Show a warning checkbox UI in modes 0 or 2 above.
user_pref("network.trr_ui.show_fallback_warning_option", false); // DEFAULT
user_pref("network.trr.display_fallback_warning", false); // DEFAULT

// PREF: DoH resolver
// [1] https://github.com/uBlockOrigin/uBlock-issues/issues/1710
user_pref("network.trr.uri", "https://mozilla.cloudflare-dns.com/dns-query");
user_pref("network.trr.custom_uri", "https://mozilla.cloudflare-dns.com/dns-query");

// PREF: set DoH bootstrap address [FF89+]
// Firefox uses the system DNS to initially resolve the IP address of your DoH server.
// When set to a valid, working value that matches your "network.trr.uri" Firefox
// won't use the system DNS. If the IP doesn't match then DoH won't work
//user_pref("network.trr.bootstrapAddr", "10.0.0.1"); // [HIDDEN PREF]

// PREF: adjust providers
user_pref("network.trr.resolvers", '[{ "name": "Cloudflare", "url": "https://mozilla.cloudflare-dns.com/dns-query" }]');

// PREF: EDNS Client Subnet (ECS)
// [WARNING] In some circumstances, enabling ECS may result
// in suboptimal routing between CDN origins and end users [2].
// [NOTE] You will also need to enable this with your
// DoH provider most likely.
// [1] https://en.wikipedia.org/wiki/EDNS_Client_Subnet
// [2] https://www.quad9.net/support/faq/#edns
// [3] https://datatracker.ietf.org/doc/html/rfc7871
//user_pref("network.trr.disable-ECS", true); // DEFAULT

// PREF: DNS Rebind Protection
// false=do not allow RFC 1918 private addresses in TRR responses (default)
// true=allow RFC 1918 private addresses in TRR responses
// [1] https://docs.controld.com/docs/dns-rebind-option
user_pref("network.trr.allow-rfc1918", true); // DEFAULT

// PREF: assorted options
//user_pref("network.trr.confirmationNS", "skip"); // skip undesired DOH test connection
//user_pref("network.trr.skip-AAAA-when-not-supported", true); // [DEFAULT] If Firefox detects that your system does not have IPv6 connectivity, it will not request IPv6 addresses from the DoH server
//user_pref("network.trr.clear-cache-on-pref-change", true); // [DEFAULT] DNS+TRR cache will be cleared when a relevant TRR pref changes
//user_pref("network.trr.wait-for-portal", false); // [DEFAULT] set this to true to tell Firefox to wait for the captive portal detection before TRR is used

// PREF: DOH exlcusions
//user_pref("network.trr.excluded-domains", ""); // DEFAULT; comma-separated list of domain names to be resolved using the native resolver instead of TRR. This pref can be used to make /etc/hosts works with DNS over HTTPS in Firefox.
//user_pref("network.trr.builtin-excluded-domains", "localhost,local"); // DEFAULT; comma-separated list of domain names to be resolved using the native resolver instead of TRR

// PREF: Oblivious HTTP (OHTTP) (DoOH)
// [Oct 2023] Cloudflare are the only ones running an OHTTP server and resolver,
// but there needs to be a relay, and it's not the cheapest thing to run.
// [1] https://blog.cloudflare.com/stronger-than-a-promise-proving-oblivious-http-privacy-properties/
// [2] https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html
// [3] https://old.reddit.com/r/dnscrypt/comments/11ukt43/what_is_dns_over_oblivious_http_targetrelay/ji1nl0m/?context=3
//user_pref("network.trr.mode", 2);
//user_pref("network.trr.ohttp.config_uri", "https://dooh.cloudflare-dns.com/.well-known/doohconfig");
//user_pref("network.trr.ohttp.uri", "https://dooh.cloudflare-dns.com/dns-query");
//user_pref("network.trr.ohttp.relay_uri", ""); // custom
//user_pref("network.trr.use_ohttp", true);

// PREF: Encrypted Client Hello (ECH) [FF118]
// [NOTE] HTTP is already isolated with network partitioning.
// [TEST] https://www.cloudflare.com/ssl/encrypted-sni
// [1] https://support.mozilla.org/en-US/kb/understand-encrypted-client-hello
// [2] https://blog.mozilla.org/en/products/firefox/encrypted-hello/
// [3] https://support.mozilla.org/en-US/kb/faq-encrypted-client-hello#w_can-i-use-ech-alongside-other-security-tools-like-vpnsre
// [4] https://wiki.mozilla.org/Security/Encrypted_Client_Hello#Preferences
user_pref("network.dns.echconfig.enabled", true); // use ECH for TLS Connections
user_pref("network.dns.http3_echconfig.enabled", true); // use ECH for QUIC connections
user_pref("network.dns.echconfig.fallback_to_origin_when_all_failed", false); // fallback to non-ECH without an authenticated downgrade signal

/******************************************************************************
 * SECTION: PROXY / SOCKS / IPv6                           *
******************************************************************************/

// PREF: disable IPv6
// If you are not masking your IP, then this won't make much difference.
// And some VPNs now cover IPv6.
// [TEST] https://ipleak.org/
// [1] https://www.internetsociety.org/tag/ipv6-security/ (Myths 2,4,5,6)
//user_pref("network.dns.disableIPv6", true);

// PREF: set the proxy server to do any DNS lookups when using SOCKS
// e.g. in Tor, this stops your local DNS server from knowing your Tor destination
// as a remote Tor node will handle the DNS request.
// [1] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers
// [SETTING] Settings>Network Settings>Proxy DNS when using SOCKS v5
user_pref("network.proxy.socks_remote_dns", true);

// PREF: disable using UNC (Uniform Naming Convention) paths [FF61+]
// [SETUP-CHROME] Can break extensions for profiles on network shares.
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/26424
user_pref("network.file.disable_unc_paths", false); // [HIDDEN PREF]

// PREF: disable GIO as a potential proxy bypass vector
// Gvfs/GIO has a set of supported protocols like obex, network,
// archive, computer, dav, cdda, gphoto2, trash, etc.
// From FF87-117, by default only sftp was accepted.
// [1] https://bugzilla.mozilla.org/1433507
// [2] https://en.wikipedia.org/wiki/GVfs
// [3] https://en.wikipedia.org/wiki/GIO_(software)
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF] [DEFAULT FF118+]

// PREF: disable check for proxies
user_pref("network.notify.checkForProxies", true);

/******************************************************************************
 * SECTION: PASSWORDS                                                        *
******************************************************************************/

// PREF: disable password manager
// [NOTE] This does not clear any passwords already saved.
// [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites
user_pref("signon.rememberSignons", false);
user_pref("signon.schemeUpgrades", true); // DEFAULT
user_pref("signon.showAutoCompleteFooter", true); // DEFAULT
user_pref("signon.autologin.proxy", false); // DEFAULT

// PREF: disable auto-filling username & password form fields
// Can leak in cross-site forms and be spoofed.
// [NOTE] Username and password is still available when you enter the field.
// [SETTING] Privacy & Security>Logins and Passwords>Autofill logins and passwords
user_pref("signon.autofillForms", false);
user_pref("signon.autofillForms.autocompleteOff", true); // DEFAULT

// PREF: disable formless login capture for Password Manager [FF51+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1166947
user_pref("signon.formlessCapture.enabled", false);

// PREF: disable capturing credentials in private browsing
user_pref("signon.privateBrowsingCapture.enabled", false);

// PREF: disable autofilling saved passwords on HTTP pages
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1217152,1319119
user_pref("signon.autofillForms.http", false); // DEFAULT

// PREF: disable Firefox built-in password generator
// Create passwords with random characters and numbers.
// [NOTE] Doesn't work with Lockwise disabled!
// [1] https://wiki.mozilla.org/Toolkit:Password_Manager/Password_Generation
user_pref("signon.generation.enabled", false);

// PREF: disable Firefox Lockwise (about:logins)
// [NOTE] No usernames or passwords are sent to third-party sites.
// [1] https://lockwise.firefox.com/
// [2] https://support.mozilla.org/en-US/kb/firefox-lockwise-managing-account-data
user_pref("signon.management.page.breach-alerts.enabled", false);
user_pref("signon.management.page.breachAlertUrl", "");
user_pref("browser.contentblocking.report.lockwise.enabled", false);
user_pref("browser.contentblocking.report.lockwise.how_it_works.url", "");

// PREF: disable Firefox Relay
// Privacy & Security > Passwords > Suggest Firefox Relay email masks to protect your email address
user_pref("signon.firefoxRelay.feature", "");

// PREF: disable websites autocomplete
// Don't let sites dictate use of saved logins and passwords.
user_pref("signon.storeWhenAutocompleteOff", false);

// PREF: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
// Hardens against potential credentials phishing.
// [WARNING] Hardening this pref may prevent you from subscribing to SoGo calendars in Thunderbird 138
// 0=don't allow sub-resources to open HTTP authentication credentials dialogs
// 1=don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
// 2=allow sub-resources to open HTTP authentication credentials dialogs (default)
// [1] https://web.archive.org/web/20181123134351/https://www.fxsitecompat.com/en-CA/docs/2015/http-auth-dialog-can-no-longer-be-triggered-by-cross-origin-resources/
user_pref("network.auth.subresource-http-auth-allow", 0);

// PREF: prevent password truncation when submitting form data
// [1] https://www.ghacks.net/2020/05/18/firefox-77-wont-truncate-text-exceeding-max-length-to-address-password-pasting-issues/
user_pref("editor.truncate_user_pastes", false);

// PREF: reveal password icon
user_pref("layout.forms.reveal-password-context-menu.enabled", false); // right-click menu option; DEFAULT [FF112]
// [DO NOT TOUCH] Icons will double-up if the website implements it natively.
user_pref("layout.forms.reveal-password-button.enabled", false); // always show icon in password fields

// PREF: disable automatic authentication on Microsoft sites [WINDOWS]
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1695693,1719301
user_pref("network.http.windows-sso.enabled", false);

/****************************************************************************
 * SECTION: ADDRESS + CREDIT CARD MANAGER                                   *
****************************************************************************/

// PREF: disable form autofill
// [NOTE] stored data is not secure (uses a JSON file)
// [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill
// [2] https://www.ghacks.net/2017/05/24/firefoxs-new-form-autofill-is-awesome
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.creditCards.enabled", false);

/****************************************************************************
 * SECTION: EXTENSIONS                                                      *
****************************************************************************/

// PREF: limit allowed extension directories
// 1=profile, 2=user, 4=application, 8=system, 16=temporary, 31=all
// The pref value represents the sum: e.g. 5 would be profile and application directories.
// [WARNING] Breaks usage of files which are installed outside allowed directories.
// [1] https://archive.is/DYjAM
user_pref("extensions.enabledScopes", 5); // [HIDDEN PREF]
user_pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15]

// PREF: skip 3rd party panel when installing recommended addons [FF82+]
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1659530,1681331
//user_pref("extensions.postDownloadThirdPartyPrompt", false);

// PREF: disable mozAddonManager Web API [FF57+]
// [NOTE] To allow extensions to work on AMO, you also need extensions.webextensions.restrictedDomains.
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988
//user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);

// PREF: disable webextension restrictions on Mozilla domains [FF60+]
// [1] https://www.reddit.com/r/firefox/comments/n1lpaf/make_addons_work_on_mozilla_sites/gwdy235/?context=3
// [2] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988
//user_pref("extensions.webextensions.restrictedDomains", "");

// PREF: do not require signing for extensions [ESR/DEV/NIGHTLY ONLY]
// [1] https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users
user_pref("xpinstall.signatures.required", true);

// PREF: disable Quarantined Domains [FF115+]
// Users may see a notification when running add-ons that are not monitored by Mozilla when they visit certain sites.
// The notification informs them that “some extensions are not allowed” and were blocked from running on that site.
// There's no details as to which sites are affected.
// [1] https://support.mozilla.org/kb/quarantined-domains
// [2] https://www.ghacks.net/2023/07/04/firefox-115-new-esr-base-and-some-add-ons-may-be-blocked-from-running-on-certain-sites/
user_pref("extensions.quarantinedDomains.enabled", true); // [DEFAULT: true]

/******************************************************************************
 * SECTION: HEADERS / REFERERS                                               *
******************************************************************************/

// PREF: default referrer policy (used unless overriden by the site)
// 0=no-referrer, 1=same-origin, 2=strict-origin-when-cross-origin (default),
// 3=no-referrer-when-downgrade
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#examples
// [2] https://plausible.io/blog/referrer-policy
user_pref("network.http.referer.defaultPolicy", 2); // DEFAULT
user_pref("network.http.referer.defaultPolicy.pbmode", 2); // DEFAULT

// PREF: default Referrer Policy for trackers (used unless overriden by the site)
// Applied to third-party trackers when the default
// cookie policy is set to reject third-party trackers.
// 0=no-referrer, 1=same-origin, 2=strict-origin-when-cross-origin (default),
// 3=no-referrer-when-downgrade
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#examples
user_pref("network.http.referer.defaultPolicy.trackers", 2);
user_pref("network.http.referer.defaultPolicy.trackers.pbmode", 2);

// PREF: HTTP Referrer Header
// [NOTE] Only cross-origin referers need control.
// See network.http.referer.XOriginPolicy.
// This may cause breakage where third party images and videos
// may not load, and with authentication on sites such as banks.
// 0 = Never send
// 1 = Send only when clicking on links and similar elements
// 2 = Send on all requests (default)
user_pref("network.http.sendRefererHeader", 2); // DEFAULT

// PREF: control when to send a cross-origin referer
// Controls whether or not to send a referrer across different sites.
// This includes images, links, and embedded social media on pages.
// This may cause breakage where third party images and videos
// may not load, and with authentication on sites such as banks.
// [NOTE] Most navigational "tracking" is harmless (i.e., the same for everyone)
// and effectively blocking cross-site referers just breaks a lot of sites.
// 0=always send referrer (default)
// 1=send across subdomains [from a.example.com to b.example.com] (breaks Instagram embeds, Bing login, MangaPill, and some streaming sites)
// 2=full host name must match [from c.example.com to c.example.com] (breaks Vimeo, iCloud, Instagram, Amazon book previews, and more)
// [TEST] https://www.jeffersonscher.com/res/jstest.php
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#examples
// [2] https://web.dev/referrer-best-practices/
user_pref("network.http.referer.XOriginPolicy", 0); // DEFAULT

// PREF: control the amount of cross-origin information to send
// Controls how much referrer to send across origins (different domains).
// 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port
// [1] https://blog.mozilla.org/security/2021/03/22/firefox-87-trims-http-referrers-by-default-to-protect-user-privacy/
// [2] https://web.dev/referrer-best-practices/
// [3] https://www.reddit.com/r/waterfox/comments/16px8yq/comment/k29r6bu/?context=3
user_pref("network.http.referer.XOriginTrimmingPolicy", 0);

/******************************************************************************
 * SECTION: CONTAINERS                                                       *
******************************************************************************/

// PREF: enable Container Tabs and its UI setting [FF50+]
// [NOTE] No longer a privacy benefit due to Firefox upgrades (see State Partitioning and Network Partitioning)
// Useful if you want to login to the same site under different accounts
// You also may want to download Multi-Account Containers for extra options (2)
// [SETTING] General>Tabs>Enable Container Tabs
// [1] https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
// [2] https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/
user_pref("privacy.userContext.ui.enabled", false);
user_pref("privacy.userContext.enabled", false);

// PREF: set behavior on "+ Tab" button to display container menu on left click [FF74+]
// [NOTE] The menu is always shown on long press and right click.
// [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab
user_pref("privacy.userContext.newTabContainerOnLeftClick.enabled", false);

// PREF: set external links to open in site-specific containers [FF123+]
// Depending on your container extension(s) and their settings:
// true=Firefox will not choose a container (so your extension can)
// false=Firefox will choose the container/no-container (default)
// [1] https://bugzilla.mozilla.org/1874599
user_pref("browser.link.force_default_user_context_id_for_external_opens", false);

/******************************************************************************
 * SECTION: WEBRTC                                                           *
******************************************************************************/

// PREF: disable WebRTC (Web Real-Time Communication)
// Firefox desktop uses mDNS hostname obfuscation and the private IP is never exposed until
// required in TRUSTED scenarios; i.e. after you grant device (microphone or camera) access.
// [TEST] https://browserleaks.com/webrtc
// [1] https://groups.google.com/g/discuss-webrtc/c/6stQXi72BEU/m/2FwZd24UAQAJ
// [2] https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-mdns-ice-candidates#section-3.1.1
user_pref("media.peerconnection.enabled", true);

// PREF: enable WebRTC Global Mute Toggles [NIGHTLY]
user_pref("privacy.webrtc.globalMuteToggles", true);

// PREF: force WebRTC inside the proxy [FF70+]
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);

// PREF: force a single network interface for ICE candidates generation [FF42+]
// When using a system-wide proxy, it uses the proxy interface.
// [1] https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
// [2] https://wiki.mozilla.org/Media/WebRTC/Privacy
// [3] https://github.com/zen-browser/desktop/issues/972
user_pref("media.peerconnection.ice.default_address_only", true);

// PREF: force exclusion of private IPs from ICE candidates [FF51+]
// [SETUP-HARDEN] This will protect your private IP even in TRUSTED scenarios after you
// grant device access, but often results in breakage on video-conferencing platforms.
user_pref("media.peerconnection.ice.no_host", true);

/******************************************************************************
 * SECTION: PLUGINS                                                          *
******************************************************************************/

// PREF: disable GMP (Gecko Media Plugins)
// [1] https://wiki.mozilla.org/GeckoMediaPlugins
user_pref("media.gmp-provider.enabled", true);

// PREF: disable widevine CDM (Content Decryption Module)
// [NOTE] This is covered by the EME master switch.
user_pref("media.gmp-widevinecdm.enabled", true);

// PREF: disable all DRM content (EME: Encryption Media Extension)
// EME is a JavaScript API for playing DRMed (not free) video content in HTML.
// A DRM component called a Content Decryption Module (CDM) decrypts,
// decodes, and displays the video.
// e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
// DRM is a propriety and closed source, but disabling is overkill.
// [SETTING] General>DRM Content>Play DRM-controlled content
// [TEST] https://bitmovin.com/demos/drm
// [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next
// [2] https://www.reddit.com/r/firefox/comments/10gvplf/comment/j55htc7
user_pref("media.eme.enabled", true);
    // Optionally, hide the setting which also disables the DRM prompt:
user_pref("browser.eme.ui.enabled", true);

/******************************************************************************
 * SECTION: JIT                                                              *
******************************************************************************/
// PREF: Just-In-Time Compilation
// Around half of zero-day exploits are directly related to "just in time"
// (JIT) compilers, and disabling that can greatly improve your protection against
// these potential exploits.
// [1] https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/
// [2] https://www.youtube.com/watch?v=i7qlZeDt9o4

// PREF: JavaScript JIT
// PREF: disable Ion and baseline JIT to harden against JS exploits
// [NOTE] When both Ion and JIT are disabled, and trustedprincipals
// is enabled, then Ion can still be used by extensions [4].
// Tor Browser doesn't even ship with these disabled by default.
// [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+jit
// [2] https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/
// [3] https://support.microsoft.com/en-us/microsoft-edge/enhance-your-security-on-the-web-with-microsoft-edge-b8199f13-b21b-4a08-a806-daed31a1929d
// [4] https://bugzilla.mozilla.org/show_bug.cgi?id=1599226
// [5] https://wiki.mozilla.org/IonMonkey
// [6] https://github.com/arkenfox/user.js/issues/1791#issuecomment-1891273681
user_pref("javascript.options.baselinejit", true);
user_pref("javascript.options.ion", true);
user_pref("javascript.options.jit_trustedprincipals", true);

// PREF: WebAssembly JIT [FF52+]
// Vulnerabilities [1] have increasingly been found, including those known and fixed
// in native programs years ago [2]. WASM has powerful low-level access, making
// certain attacks (brute-force) and vulnerabilities more possible.
// [STATS] ~0.2% of websites, about half of which are for cryptomining / malvertising [2][3]
// [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=wasm
// [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
// [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes
user_pref("javascript.options.wasm", true);
user_pref("javascript.options.wasm_trustedprincipals", true);
user_pref("javascript.options.wasm_baselinejit", true);
user_pref("javascript.options.wasm_optimizingjit", true);

// PREF: Asm.js JIT [FF22+]
// [1] http://asmjs.org/
// [2] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=asm.js
// [3] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/
user_pref("javascript.options.asmjs", true);

// PREF: Blinterp (JIT-like)
user_pref("javascript.options.blinterp", true);

/******************************************************************************
 * SECTION: VARIOUS                                                          *
******************************************************************************/

// PREF: decode URLs in other languages
// [WARNING] Causes unintended consequences when copy+paste links with underscores.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1320061
user_pref("browser.urlbar.decodeURLsOnCopy", true); // DEFAULT

// PREF: number of usages of the web console
// If this is less than 5, then pasting code into the web console is disabled.
user_pref("devtools.selfxss.count", 5);

// PREF: disable middle click on new tab button opening URLs or searches using clipboard [FF115+]
// Enable if you're using LINUX.
user_pref("browser.tabs.searchclipboardfor.middleclick", true); // DEFAULT WINDOWS macOS

// PREF: do not allow PDFs to load javascript
// [1] https://www.reddit.com/r/uBlockOrigin/comments/mulc86/firefox_88_now_supports_javascript_in_pdf_files/

// PREF: enforce PDFJS, disable PDFJS scripting
// This setting controls if the option "Display in Firefox" is available in the setting below
// and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With").
// [WHY] pdfjs is lightweight, open source, and secure: the last exploit was June 2015 [1].
// It doesn't break "state separation" of browser content (by not sharing with OS, independent apps).
// It maintains disk avoidance and application data isolation. It's convenient. You can still save to disk.
// [NOTE] JS can still force a pdf to open in-browser by bundling its own code.
// [SETUP-CHROME] You may prefer a different pdf reader for security/workflow reasons.
// [SETTING] General>Applications>Portable Document Format (PDF)
// [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=pdf.js+firefox
// [2] https://www.reddit.com/r/uBlockOrigin/comments/mulc86/firefox_88_now_supports_javascript_in_pdf_files/
user_pref("pdfjs.disabled", true); // [DEFAULT: false]
user_pref("pdfjs.enableScripting", false); // [FF86+]

 /******************************************************************************
 * SECTION: SAFE BROWSING (SB)                                               *
******************************************************************************/

// A full url is never sent to Google, only a part-hash of the prefix,
// hidden with noise of other real part-hashes. Firefox takes measures such as
// stripping out identifying parameters, and since SBv4 (FF57+), doesn't even use cookies.
// (Turn on browser.safebrowsing.debug to monitor this activity)
// [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
// [2] https://wiki.mozilla.org/Security/Safe_Browsing
// [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
// [4] https://educatedguesswork.org/posts/safe-browsing-privacy/
// [5] https://www.google.com/chrome/privacy/whitepaper.html#malware
// [6] https://security.googleblog.com/2022/08/how-hash-based-safe-browsing-works-in.html

// PREF: Safe Browsing
// [WARNING] Be sure to have alternate security measures if you disable SB! Adblockers do not count!
// [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content
// [ALTERNATIVE] Enable local checks only: https://github.com/yokoffing/Betterfox/issues/87
// [1] https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work#w_what-information-is-sent-to-mozilla-or-its-partners-when-phishing-and-malware-protection-is-enabled
// [2] https://wiki.mozilla.org/Security/Safe_Browsing
// [3] https://developers.google.com/safe-browsing/v4
// [4] https://github.com/privacyguides/privacyguides.org/discussions/423#discussioncomment-1752006
// [5] https://github.com/privacyguides/privacyguides.org/discussions/423#discussioncomment-1767546
// [6] https://wiki.mozilla.org/Security/Safe_Browsing
// [7] https://ashkansoltani.org/2012/02/25/cookies-from-nowhere (outdated)
// [8] https://blog.cryptographyengineering.com/2019/10/13/dear-apple-safe-browsing-might-not-be-that-safe/ (outdated)
// [9] https://the8-bit.com/apple-proxies-google-safe-browsing-privacy/
// [10] https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-(features-we-disable-or-remove)#services-we-proxy-through-brave-servers
user_pref("browser.safebrowsing.malware.enabled", true); // all checks happen remotely
user_pref("browser.safebrowsing.phishing.enabled", true); // all checks happen remotely
user_pref("browser.safebrowsing.blockedURIs.enabled", true); // all checks happen remotely

// PREF: disable SB checks for downloads
// This is the master switch for the safebrowsing.downloads prefs (both local lookups + remote).
// [NOTE] Still enable this for checks to happen locally.
// [SETTING] Privacy & Security>Security>... "Block dangerous downloads"
user_pref("browser.safebrowsing.downloads.enabled", true); // all checks happen locally

// PREF: disable SB checks for downloads (remote)
// To verify the safety of certain executable files, Firefox may submit some information about the
// file, including the name, origin, size and a cryptographic hash of the contents, to the Google
// Safe Browsing service which helps Firefox determine whether or not the file should be blocked.
// [NOTE] If you do not understand the consequences, override this.
user_pref("browser.safebrowsing.downloads.remote.enabled", true);
// disable SB checks for unwanted software
// [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software"
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", true);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", true);

// PREF: allow user to "ignore this warning" on SB warnings
// If clicked, it bypasses the block for that session. This is a means for admins to enforce SB.
// Report false positives to [2]
// [TEST] see https://github.com/arkenfox/user.js/wiki/Appendix-A-Test-Sites#-mozilla
// [1] https://bugzilla.mozilla.org/1226490
// [2] https://safebrowsing.google.com/safebrowsing/report_general/
user_pref("browser.safebrowsing.allowOverride", true); // DEFAULT

/******************************************************************************
 * SECTION: MOZILLA                                                   *
******************************************************************************/

// PREF: prevent accessibility services from accessing your browser [RESTART]
// Accessibility Service may negatively impact Firefox browsing performance.
// Disable it if you’re not using any type of physical impairment assistive software.
// [1] https://support.mozilla.org/kb/accessibility-services
// [2] https://www.ghacks.net/2021/08/25/firefox-tip-turn-off-accessibility-services-to-improve-performance/
// [3] https://www.reddit.com/r/firefox/comments/p8g5zd/why_does_disabling_accessibility_services_improve
// [4] https://winaero.com/firefox-has-accessibility-service-memory-leak-you-should-disable-it/
// [5] https://www.ghacks.net/2022/12/26/firefoxs-accessibility-performance-is-getting-a-huge-boost/
user_pref("accessibility.force_disabled", 1);
user_pref("devtools.accessibility.enabled", false);

// PREF: enable Firefox Sync
// [ALTERNATIVE] Use xBrowserSync [1]
// [1] https://addons.mozilla.org/en-US/firefox/addon/xbs
// [2] https://github.com/arkenfox/user.js/issues/1175
user_pref("identity.fxaccounts.enabled", true);

// PREF: disable Firefox View [FF106+]
// You can no longer disable Firefox View as of [FF127+].
// To hide the icon from view, see [2].
// [1] https://support.mozilla.org/en-US/kb/how-set-tab-pickup-firefox-view#w_what-is-firefox-view
// [2] https://support.mozilla.org/en-US/kb/how-set-tab-pickup-firefox-view#w_how-do-i-remove-firefox-view-from-the-tabs-bar

// PREF: disable the Firefox View tour from popping up
user_pref("browser.firefox-view.feature-tour", "{\"screen\":\"\",\"complete\":true}");

// PREF: disable Push Notifications API [FF44+]
// [WHY] Website "push" requires subscription, and the API is required for CRLite.
// Push is an API that allows websites to send you (subscribed) messages even when the site
// isn't loaded, by pushing messages to your userAgentID through Mozilla's Push Server.
// You shouldn't need to disable this.
// [NOTE] To remove all subscriptions, reset "dom.push.userAgentID"
// [1] https://support.mozilla.org/en-US/kb/push-notifications-firefox
// [2] https://developer.mozilla.org/en-US/docs/Web/API/Push_API
// [3] https://www.reddit.com/r/firefox/comments/fbyzd4/the_most_private_browser_isnot_firefox/
user_pref("dom.push.enabled", true);

// PREF: default permission for Web Notifications
// To add site exceptions: Page Info>Permissions>Receive Notifications
// To manage site exceptions: Options>Privacy & Security>Permissions>Notifications>Settings
// 0=always ask (default), 1=allow, 2=block
// [1] https://easylinuxtipsproject.blogspot.com/p/security.html#ID5
// [2] https://github.com/yokoffing/Betterfox/wiki/Common-Overrides#site-notifications
user_pref("permissions.default.desktop-notification", 2);

// PREF: default permission for Location Requests
// 0=always ask (default), 1=allow, 2=block
user_pref("permissions.default.geo", 2);

// PREF: use alternative geolocation service instead of Google
// [NOTE] Mozilla's geolocation service was discontinued in June 2024 [1].
// BeaconDB is its replacement.
// [1] https://github.com/mozilla/ichnaea/issues/2065
// [2] https://codeberg.org/beacondb/beacondb
// [3] https://github.com/yokoffing/Betterfox/issues/378
user_pref("geo.provider.network.url", "https://beacondb.net/v1/geolocate");

// PREF: disable using the OS's geolocation service
user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_geoclue", false); // [FF102+] [LINUX]

// PREF: logging geolocation to the console
user_pref("geo.provider.network.logging.enabled", true);

// PREF: disable region updates
// [1] https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/Region.html
user_pref("browser.region.update.enabled", false);
user_pref("browser.region.network.url", "");

// PREF: enforce Firefox blocklist for extensions + no hiding tabs
// This includes updates for "revoked certificates".
// [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/
// [2] https://trac.torproject.org/projects/tor/ticket/16931
user_pref("extensions.blocklist.enabled", true); // DEFAULT

// PREF: disable auto-INSTALLING Firefox updates [NON-WINDOWS]
// [NOTE] In FF65+ on Windows this SETTING (below) is now stored in a file and the pref was removed.
// [SETTING] General>Firefox Updates>Check for updates but let you choose to install them
user_pref("app.update.auto", false);

// PREF: disable automatic extension updates
user_pref("extensions.update.enabled", true);

// PREF: disable search engine updates (e.g. OpenSearch)
// Prevent Firefox from adding back search engines after you removed them.
// [NOTE] This does not affect Mozilla's built-in or Web Extension search engines.
user_pref("browser.search.update", false);

// PREF: remove special permissions for certain mozilla domains [FF35+]
// default = resource://app/defaults/permissions
user_pref("permissions.manager.defaultsUrl", "");

// PREF: remove webchannel whitelist
user_pref("webchannel.allowObject.urlWhitelist", ""); // [DEFAULT FF132+]

// PREF: disable metadata caching for installed add-ons by default
// [1] https://blog.mozilla.org/addons/how-to-opt-out-of-add-on-metadata-updates/
user_pref("extensions.getAddons.cache.enabled", false);

/******************************************************************************
 * SECTION: TELEMETRY                                                   *
******************************************************************************/

// PREF: disable new data submission [FF41+]
// If disabled, no policy is shown or upload takes place, ever.
// [1] https://bugzilla.mozilla.org/1195552
user_pref("datareporting.policy.dataSubmissionEnabled", false);

// PREF: disable Health Reports
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical data.
user_pref("datareporting.healthreport.uploadEnabled", false);

// PREF: disable telemetry
// - If "unified" is false then "enabled" controls the telemetry module
// - If "unified" is true then "enabled" only controls whether to record extended data
// [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
// [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
// [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.dap_enabled", false); // DEFAULT [FF108]

// PREF: disable Telemetry Coverage
// [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/
// [2] https://github.com/yokoffing/Betterfox/issues/443
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");

// PREF: disable Firefox Home (Activity Stream) telemetry
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

// PREF: disable daily active users [FF136+]
user_pref("datareporting.usage.uploadEnabled", false);

/******************************************************************************
 * SECTION: EXPERIMENTS                                                      *
******************************************************************************/

// PREF: disable Studies
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies
user_pref("app.shield.optoutstudies.enabled", false);

// PREF: disable Normandy/Shield [FF60+]
// Shield is an telemetry system (including Heartbeat) that can also push and test "recipes".
// [1] https://mozilla.github.io/normandy/
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

/******************************************************************************
 * SECTION: CRASH REPORTS                                                    *
******************************************************************************/

// PREF: disable crash reports
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // DEFAULT

// PREF: enforce no submission of backlogged crash reports
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT FF132+]

/******************************************************************************
 * SECTION: DETECTION                                                        *
******************************************************************************/

// PREF: disable Captive Portal detection
// [WARNING] Do NOT use for mobile devices. May NOT be able to use Firefox on public wifi (hotels, coffee shops, etc).
// [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy
// [2] https://wiki.mozilla.org/Necko/CaptivePortal
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);

// PREF: disable Network Connectivity checks
// [WARNING] Do NOT use for mobile devices. May NOT be able to use Firefox on public wifi (hotels, coffee shops, etc).
// [1] https://bugzilla.mozilla.org/1460537
user_pref("network.connectivity-service.enabled", false);

// PREF: disable Privacy-Preserving Attribution [FF128+]
// [NOTE] PPA disabled if main telemetry switches are disabled.
// [SETTING] Privacy & Security>Website Advertising Preferences>Allow websites to perform privacy-preserving ad measurement
// [1] https://support.mozilla.org/kb/privacy-preserving-attribution
// [2] https://searchfox.org/mozilla-central/rev/f3e4b33a6122ce63bf81ae8c30cc5ac37458864b/dom/privateattribution/PrivateAttributionService.sys.mjs#267
user_pref("dom.private-attribution.submission.enabled", false);
user_pref("toolkit.telemetry.dap_helper", ""); // [OPTIONAL HARDENING]
user_pref("toolkit.telemetry.dap_leader", ""); // [OPTIONAL HARDENING]

// PREF: software that continually reports what default browser you are using [WINDOWS]
// [WARNING] Breaks "Make Default..." button in Preferences to set Firefox as the default browser [2].
// [1] https://techdows.com/2020/04/what-is-firefox-default-browser-agent-and-how-to-disable-it.html
// [2] https://github.com/yokoffing/Betterfox/issues/166
user_pref("default-browser-agent.enabled", true);

// PREF: "report extensions for abuse"
user_pref("extensions.abuseReport.enabled", false);

// PREF: SERP Telemetry [FF125+]
// [1] https://blog.mozilla.org/en/products/firefox/firefox-search-update/
user_pref("browser.search.serpEventTelemetryCategorization.enabled", false);

// PREF: assorted telemetry
// [NOTE] Shouldn't be needed for user.js, but browser forks may want to disable these prefs.
user_pref("doh-rollout.disable-heuristics", true); // ensure DoH doesn't get enabled automatically
user_pref("dom.security.unexpected_system_load_telemetry_enabled", false);
user_pref("messaging-system.rsexperimentloader.enabled", false);
user_pref("network.trr.confirmation_telemetry_enabled", false);
user_pref("security.app_menu.recordEventTelemetry", false);
user_pref("security.certerrors.mitm.priming.enabled", false);
user_pref("security.certerrors.recordEventTelemetry", false);
user_pref("security.protectionspopup.recordEventTelemetry", false);
user_pref("signon.recipes.remoteRecipes.enabled", false);
user_pref("privacy.trackingprotection.emailtracking.data_collection.enabled", false);
user_pref("messaging-system.askForFeedback", true); // DEFAULT [FF120+]
