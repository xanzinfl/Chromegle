/** @type {SettingsManager} */
let Settings;

/** @type {ChatRegistryManager} */
let ChatRegistry;

/** @type {Object} */
let Manifest;

(function () {
    $("html").css("visibility", "visible");
    Logger.INFO("Extention Starting, Loading Modules")

    if (window.location.href.includes('ban')) {
        const banLink = ConstantValues.websiteURL + "/banned";
        alert("Message from chromegle: For more information on why you may have been banned, please visit: " + banLink);
        return;
    }

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
         SettingsManager,
         TimerSkipManager,
         RepeatSkipManager,
         BroadcastManager,
    );

    window.addEventListener("DOMContentLoaded", () => {
        loadModules(
            ThemeManager,
            ClearInterestsManager,
            UserCountManager,
        );
    });

})();