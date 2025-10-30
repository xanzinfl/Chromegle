let lastAutoSkipTime = 0;
let consecutiveSkips = 0;

function performDebouncedSkip(uuidToSkip) {
    const now = Date.now();
    const timeSinceLastSkip = now - lastAutoSkipTime;
    const RESET_INTERVAL = 2000;
    const COOLDOWN_PERIOD = 2500;
    if (timeSinceLastSkip > RESET_INTERVAL) {
        consecutiveSkips = 0;
    }

    let delay = 0;
    if (consecutiveSkips === 0) {
        delay = 0;
    } else {
        delay = Math.max(0, COOLDOWN_PERIOD - timeSinceLastSkip);
    }

    setTimeout(() => {
        if (ChatRegistry.getUUID() !== uuidToSkip) {
            Logger.INFO("Auto-skip cancelled because the user has already changed.");
            return;
        }
        Logger.DEBUG(`Executing potentially delayed skip for UUID ${uuidToSkip}.`);
        if (typeof skipIfPossible === 'function') {
            skipIfPossible();
        } else {
            Logger.ERROR("skipIfPossible() function not found!");
        }
        
        lastAutoSkipTime = Date.now();
        consecutiveSkips++;
    }, delay);
}

function registerManualSkip() {
    Logger.DEBUG("Manual skip detected, updating cooldown timer.");
    const now = Date.now();
    const timeSinceLastSkip = now - lastAutoSkipTime;
    const RESET_INTERVAL = 5000; 

    if (timeSinceLastSkip > RESET_INTERVAL) {
        consecutiveSkips = 0;
    }

    lastAutoSkipTime = now;
    consecutiveSkips++;
}

// Client ID for online user api
if (!localStorage.getItem("clientId")) {
    localStorage.setItem("clientId", crypto.randomUUID());
}
const clientId = localStorage.getItem("clientId");

/** @type {SettingsManager} */
let Settings;

/** @type {ChatRegistryManager} */
let ChatRegistry;

/** @type {Object} */
let Manifest;

(function () {
    $("html").css("visibility", "visible");
    Logger.INFO("Extention Starting, Loading Modules")

    $(document).on('click', '.skipButton', registerManualSkip);

    $(document).on('keydown', (e) => {
        if (e.key === "Escape" || e.keyCode === 27) {
            registerManualSkip();
        }
    });

    loadModules(
         IPBlockingManager,
         ThemeManager,
         TopicSyncManager,
         ChatRegistryManager,
         ChatManager,
         FilterManager,
         ConfirmManager,
         AutoMessageManager,
         ReconnectManager,
         IPGrabberManager,
         SpeechEngineManager,
         ClearInterestsManager,
         SettingsManager,
         TimerSkipManager,
         RepeatSkipManager,
         UserCountManager,
    );

})();