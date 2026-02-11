/** @type {SettingsManager} */
let Settings;

/** @type {ChatRegistryManager} */
let ChatRegistry;

/** @type {Object} */
let Manifest;

(function () {
    $("html").css("visibility", "visible");
    Logger.INFO("Extention Starting, Loading Modules")

    runDataLoaders(
        ManifestLoader,
        TipsLoader
    )

    loadModules(
         BypassManager,
         IPBlockingManager,
         TopicSyncManager,
         ChatRegistryManager,
         PasteMenu,
         ChatManager,
         FilterManager,
         AutoMessageManager,
         ReconnectManager,
         IPGrabberManager,
         SpeechEngineManager,
         ClearInterestsManager,
         SettingsManager,
         TimerSkipManager,
         RepeatSkipManager,
         UserCountManager,
         BroadcastManager,
    );

    window.addEventListener("DOMContentLoaded", () => {
        loadModules(
            ThemeManager,
        );
    });

})();