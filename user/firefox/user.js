// Fancy stuff
// credit: https://github.com/black7375/Firefox-UI-Fix
// only sharpen scrolling
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("general.smoothScroll", true); // DEFAULT
user_pref("mousewheel.min_line_scroll_amount", 10); // 10-40; adjust this number to your liking; default=5
user_pref("general.smoothScroll.mouseWheel.durationMinMS", 80); // default=50
user_pref("general.smoothScroll.currentVelocityWeighting", "0.15"); // default=.25
user_pref("general.smoothScroll.stopDecelerationWeighting", "0.6"); // default=.4
user_pref("general.smoothScroll.msdPhysics.enabled", true); // [FF122+ Nightly]
user_pref("apz.overscroll.enabled", true); // DEFAULT NON-LINUX
user_pref("mousewheel.default.delta_multiplier_y", 275); // 250-400; adjust this number to your liking

// Performance
user_pref("nglayout.initialpaint.delay", 1); // DEFAULT; formerly 250
user_pref("nglayout.initialpaint.delay_in_oopif", 1); // DEFAULT
user_pref("content.notify.ontimer", true);
user_pref("content.notify.interval", 100000);
user_pref("browser.newtab.preload", true);
user_pref("dom.iframe_lazy_loading.enabled", true);
// GPU
user_pref("gfx.webrender.all", true); // enables WR + additional features
user_pref("gfx.webrender.precache-shaders", true); // longer initial startup time
user_pref("gfx.webrender.compositor", true); // DEFAULT WINDOWS macOS
user_pref("gfx.webrender.compositor.force-enabled", true); // enforce
user_pref("gfx.canvas.accelerated", true); // DEFAULT macOS LINUX [FF110]; not compatible with WINDOWS integrated GPUs
user_pref("gfx.canvas.accelerated.cache-items", 16384); // default=2048; Chrome=4096
user_pref("gfx.canvas.accelerated.cache-size", 2048); // default=256; Chrome=512
user_pref("gfx.content.skia-font-cache-size", 60); // default=5; Chrome=20
user_pref("layers.gpu-process.enabled", true); // DEFAULT WINDOWS
user_pref("layers.gpu-process.force-enabled", true); // enforce
user_pref("layers.mlgpu.enabled", true); // LINUX
user_pref("media.hardware-video-decoding.enabled", true); // DEFAULT WINDOWS macOS
user_pref("media.hardware-video-decoding.force-enabled", true); // enforce
user_pref("media.gpu-process-decoder", true); // DEFAULT WINDOWS
user_pref("media.ffmpeg.vaapi.enabled", true); // LINUX
user_pref("gfx.webrender.dcomp-video-hw-overlay-win", true); // DEFAULT
user_pref("gfx.webrender.dcomp-video-hw-overlay-win-force-enabled", true); // enforce
// Network
user_pref("network.http.max-connections", 16384); // default=900
user_pref("network.http.max-persistent-connections-per-server", 128); // default=6; download connections; anything above 10 is excessive
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 128); // default=3
user_pref("network.http.max-persistent-connections-per-proxy", 256); // default=32
user_pref("network.websocket.max-connections", 1000);
user_pref("network.http.pacing.requests.enabled", false);
user_pref("network.dnsCacheExpiration", 3600); // keep entries for 1 hour
user_pref("network.dnsCacheExpirationGracePeriod", 240);
user_pref("network.dns.max_high_priority_threads", 120); // DEFAULT [FF 123?]
user_pref("network.dns.max_any_priority_threads", 120);
user_pref("network.ssl_tokens_cache_capacity", 16384);
// Experimental
user_pref("dom.enable_web_task_scheduling", true);
user_pref("layout.css.grid-template-masonry-value.enabled", true);
user_pref("dom.security.sanitizer.enabled", true);
user_pref("dom.webgpu.enabled", true);
user_pref("gfx.webgpu.force-enabled", true); // enforce
// enable WebGPU indirect draws/dispatches:
user_pref("dom.webgpu.indirect-dispatch.enabled", true);
// Process count
user_pref("dom.ipc.processCount", 16); // DEFAULT; Shared Web Content
user_pref("dom.ipc.processCount.webIsolated", 16);
user_pref("dom.ipc.processPrelaunch.fission.number", 16);
user_pref("fission.webContentIsolationStrategy", 1); // DEFAULT
user_pref("browser.preferences.defaultPerformanceSettings.enabled", true); // DEFAULT
user_pref("dom.ipc.processCount.webIsolated", 16);

// Goodgbye weird stuff
user_pref("browser.privatebrowsing.vpnpromourl", "");
user_pref("browser.vpn_promo.enabled", false);

// PREF: disable about:addons' Recommendations pane (uses Google Analytics)
user_pref("extensions.getAddons.showPane", false); // HIDDEN

// PREF: disable recommendations in about:addons' Extensions and Themes panes
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);

// PREF: Personalized Extension Recommendations in about:addons and AMO
// [NOTE] This pref has no effect when Health Reports are disabled.
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to make personalized extension recommendations
user_pref("browser.discovery.enabled", false);

// PREF: disable Fakespot integration [FF116+]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1840156#c0
// [2] https://github.com/arkenfox/user.js/issues/1730
// [3] https://www.fakespot.com/
// [4] https://www.ghacks.net/2023/10/12/firefox-will-soon-tell-you-if-product-reviews-are-reliable/
user_pref("browser.shopping.experience2023.enabled", false); // DEFAULT
user_pref("browser.shopping.experience2023.ads.exposure", false); // DEFAULT [FF121+]
// PREF: disable Firefox from asking to set as the default browser
// [1] https://github.com/yokoffing/Betterfox/issues/166
user_pref("browser.shell.checkDefaultBrowser", false);

// PREF: disable Extension Recommendations (CFR: "Contextual Feature Recommender")
// [1] https://support.mozilla.org/en-US/kb/extension-recommendations
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);

// PREF: hide "More from Mozilla" in Settings
user_pref("browser.preferences.moreFromMozilla", false);

// PREF: tab and about:config warnings
//user_pref("browser.tabs.warnOnClose", false); // DEFAULT [FF94+]
//user_pref("browser.tabs.warnOnCloseOtherTabs", true); // DEFAULT
//user_pref("browser.tabs.warnOnOpen", true); // DEFAULT
user_pref("browser.aboutConfig.showWarning", false);

// PREF: disable welcome notices
//user_pref("browser.startup.homepage_override.mstone", "ignore"); // What's New page after updates; master switch
user_pref("browser.aboutwelcome.enabled", false); // disable Intro screens
user_pref("startup.homepage_welcome_url", "");
user_pref("startup.homepage_welcome_url.additional", "");
user_pref("startup.homepage_override_url", ""); // What's New page after updates

// PREF: disable "What's New" toolbar icon [FF69+]
user_pref("browser.messaging-system.whatsNewPanel.enabled", false);

// PREF: only show List All Tabs icon when needed
// true=always show tab overflow dropdown (FF106+ default)
// false=only display tab dropdown when there are too many tabs
// [1] https://www.ghacks.net/2022/10/19/how-to-hide-firefoxs-list-all-tabs-icon/
user_pref("browser.tabs.tabmanager.enabled", false);

// PREF: new profile switcher
user_pref("browser.profiles.enabled", true);

// PREF: use native title bar buttons [LINUX]
// [1] https://github.com/yokoffing/Betterfox/issues/320
user_pref("widget.gtk.non-native-titlebar-buttons.enabled", true);

// PREF: enable Firefox to use userChome, userContent, etc.

// PREF: add compact mode back to options
user_pref("browser.compactmode.show", true);
user_pref("layout.css.prefers-color-scheme.content-override", 0);
user_pref("browser.newtabpage.activity-stream.newtabWallpapers.v2.enabled", true);
user_pref("cookiebanners.service.mode", 1);
user_pref("cookiebanners.service.mode.privateBrowsing", 1);
user_pref("cookiebanners.service.enableGlobalRules", true); // DEFAULT [FF121+]
user_pref("cookiebanners.service.enableGlobalRules.subFrames", true); // DEFAULT [FF121+]
user_pref("browser.translations.enable", false); // DEFAULT
user_pref("browser.translations.autoTranslate", false);
// PREF: remove fullscreen delay
user_pref("full-screen-api.transition-duration.enter", "0 0"); // default=200 200
user_pref("full-screen-api.transition-duration.leave", "0 0"); // default=200 200

// PREF: disable fullscreen notice
user_pref("full-screen-api.warning.delay", -1); // default=500
user_pref("full-screen-api.warning.timeout", 0); // default=3000
user_pref("gfx.webrender.quality.force-subpixel-aa-where-possible", true);
user_pref("extensions.pocket.enabled", false);
user_pref("extensions.pocket.api", " ");
user_pref("extensions.pocket.oAuthConsumerKey", " ");
user_pref("extensions.pocket.site", " ");
user_pref("extensions.pocket.showHome", false);
user_pref("widget.gtk.hide-pointer-while-typing.enabled", false);
user_pref("image.jxl.enabled", true);

// SECURITY
user_pref("privacy.trackingprotection.enabled", true); // enabled with "Strict"
user_pref("privacy.trackingprotection.pbmode.enabled", true); // DEFAULT
user_pref("browser.contentblocking.customBlockList.preferences.ui.enabled", false); // DEFAULT
user_pref("browser.contentblocking.category", "strict");
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
user_pref("privacy.query_stripping.enabled", true); // enabled with "Strict"
user_pref("privacy.query_stripping.enabled.pbmode", true); // enabled with "Strict"
user_pref("privacy.query_stripping.strip_list", ""); // DEFAULT
user_pref("privacy.query_stripping.strip_on_share.enabled", true);
user_pref("privacy.trackingprotection.lower_network_priority", true);
user_pref("privacy.bounceTrackingProtection.enabled", true);
user_pref("network.cookie.sameSite.noneRequiresSecure", true);
user_pref("browser.uitour.enabled", false);
user_pref("privacy.globalprivacycontrol.enabled", true);
user_pref("privacy.globalprivacycontrol.functionality.enabled", true); // [FF120+]
user_pref("privacy.globalprivacycontrol.pbmode.enabled", true);
user_pref("security.OCSP.enabled", 1);
user_pref("security.OCSP.require", true);
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 3);
user_pref("security.cert_pinning.enforcement_level", 2);
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
user_pref("security.ssl.require_safe_negotiation", true);
user_pref("browser.xul.error_pages.expert_bad_cert", true);
user_pref("security.tls.enable_0rtt_data", false);
user_pref("privacy.resistFingerprinting.randomization.daily_reset.enabled", true);
user_pref("privacy.resistFingerprinting.randomization.daily_reset.private.enabled", true);
user_pref("dom.security.https_only_mode_pbm", true); // Private Browsing windows only
user_pref("dom.security.https_only_mode", true);
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);
user_pref("dom.security.https_only_mode_send_http_background_request", false);
user_pref("network.trr.mode", 3);
user_pref("network.trr.uri", "https://cloudflare-dns.com/dns-query");
user_pref("network.trr.custom_uri", "https://cloudflare-dns.com/dns-query");
user_pref("security.mixed_content.block_display_content", true);
user_pref("accessibility.force_disabled", 1);
user_pref("devtools.accessibility.enabled", false);
user_pref("permissions.default.desktop-notification", 2);
user_pref("permissions.default.geo", 2);
user_pref("permissions.default.camera", 2);
user_pref("permissions.default.microphone", 2);

// Telemetry
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
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");

// PREF: disable Firefox Home (Activity Stream) telemetry
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

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
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);
user_pref("browser.search.serpEventTelemetryCategorization.enabled", false);
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("browser.uidensity", 0);
user_pref("svg.context-properties.content.enabled", true);
user_pref("browser.theme.dark-private-windows", false);
user_pref("widget.gtk.rounded-bottom-corners.enabled", true);
