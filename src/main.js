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
         IPBlockingManager,
         ThemeManager,
         TopicSyncManager,
         ChatRegistryManager,
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

})();