class ThemeManager extends Module {

    #stylesheet;

    OverrideManager = new OverrideManager();

    constructor() {
        super();
        config.semiLightModeOption.retrieveValue().then(this.setupTheme.bind(this)).catch(this.showPage);
    }

    async setupTheme(themeMode) {

        // Set up MicroModal
        MicroModal.init();

        // Set the theme mode
        this.#stylesheet = this.#injectStylesheet();

        // Initialize overrides
        this.OverrideManager.initialize();
        this.setThemeMode(config[themeMode].getValue());

        // Mobile support
        if (isMobile()) {
            this.OverrideManager.overrideMobile();
        }

        // Make page visible
        this.showPage();

    }

    #injectStylesheet() {
        let sheet = document.createElement("link");
        sheet.rel = "stylesheet";
        sheet.id = "customStylesheet";
        document.head.appendChild(sheet);

        return sheet;
    }

    showPage() {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
    }

    setThemeMode(resourcePath) {
        this.#stylesheet.href = chrome.runtime.getURL(resourcePath);
        this.#stylesheet.id = "customStylesheet";
    }

    onSettingsUpdate(event) {
        let modeChanged = config.semiLightModeOption.fromSettingsUpdateEvent(event);

        if (modeChanged != null) {
            this.setThemeMode(config[modeChanged].getValue());
        }

    }

}


class OverrideManager {

    initialize() {
        [
            this.#overrideBody,
            this.#overrideDarkMode,
            this.#overrideLogo,
            this.#overrideTaglineInsertMenu,
            this.#overrideHomePageText,
            this.#overrideLinks,
            this.#resizeCommonInterestsLabel,
            this.#overrideFaq,
            this.#removeWmark
        ].forEach((fn) => {
            try {
                fn();
            } catch (ex) {
                Logger.ERROR("A theme management function has failed, stack-trace below:");
                console.log(ex);
            }
        })
    }

    overrideMobile() {

        document.documentElement.classList.add("chromegle-mobile");

        $("button.homeButton")
            .css("margin-top", "10px")
            .css("margin-bottom", "10px")

        $("#menucontainer")
            .css("justify-content", "center")
            .css("margin-bottom", "10px")
            .css("margin-top", "10px");

    }

    #resizeCommonInterestsLabel = () => {
        $(".shoulduselikescheckbox").parent().css("font-size", "15px");

    }

    #overrideBody = () => {
        $("body").css("min-height", "").css("top", "")
        localStorage.setItem("darkMode", "false");
    }

    #overrideDarkMode = () => {
        $("body > header > div > label").remove();

    }

    #overrideLinks = () => $("#feedback").remove();
    #overrideLogo = () => {
        $("#logo > img").replaceWith(ButtonFactory.homeButton)
    };

    #overrideTaglineInsertMenu = () => {
        let div = document.createElement("div");
        div.id = "menucontainer";
        div.classList.add("settingsButtonContainer");
        div.append(ButtonFactory.menuButton.get(0))
        $(".rightSide").append(div);
    };

    #overrideHomePageText() {
        let note = $("body > div > div.mainContent > p").get(0);
        if (!note) return;

        note.innerHTML =
            "Thanks for using Chromegle! Like what we've got? " +
            "<a target='_blank' href='https://github.com/xanzinfl/chromegle#authors'>Check out the developers</a> " +
            "for more :)";
    }

    #overrideFaq = () => $(".faq-section").remove();

    #removeWmark = () => {
        const wrapper = document.querySelector('.videoWrapper.remote.noSelect');
        const wm = document.querySelector('.mWmark');
        const video = document.getElementById('remoteVideo');

        if (wrapper && wm && video) {
            wrapper.style.position = 'relative';
            wm.style.zIndex = '-1';
            wm.style.position = 'absolute';
            wm.style.top = '0';
            wm.style.left = '0';
            video.style.zIndex = '1';
        }
    }
}
