
class SpeechMenu {

    static settingsModalElementId = "modal-4";
    static enable = () => MicroModal.show(this.settingsModalElementId);
    static disable = () => MicroModal.hide(this.settingsModalElementId);

    constructor() {
        Logger.INFO("SpeechManager Loaded")
        let modal = document.createElement("div");
        $(modal).load(getResourceURL("public/html/voicecmds.html"));
        $("html").append(modal);
    }

    reloadMenu(noChange) {

        if (noChange) {
            return;
        }

        Settings.disable();
        SpeechMenu.enable();
    }

}

class SpeechEngineManager extends Module {

    static Menu = new SpeechMenu();
    #engine = new SpeechEngine(
        ["omegle", "amigo", "omigo", "uhmegle"],
        "speechEngineCommand",
        [
            new SkipIntentHandler(),
            new StopIntentHandler(),
            new StartIntentHandler(),
            new MessageIntentHandler()
        ]
    );

    onSettingsUpdate(event) {

        let voiceCommandEnabled = config.voiceCommandToggle.fromSettingsUpdateEvent(event);

        if (voiceCommandEnabled === "true") {
            this.#engine.start();
            Logger.INFO("Voice Commands Started");
        }
        else if (voiceCommandEnabled === "false") {
            this.#engine.stop();
            Logger.INFO("Voice Commands Stopped");
        }

    }

    async onPageStarted() {
        const voiceCommandEnabled = await config.voiceCommandToggle.retrieveValue();

        if (voiceCommandEnabled === "true") {
            this.#engine.start();
            Logger.INFO("Voice Commands Started");
        }

    }

}
