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
        this.#stylesheet = this.#getStylesheet();

        // Initialize overrides
        this.OverrideManager.initialize();
        this.setThemeMode(config[themeMode].getValue());

        // Header settings
        let headerEnabled = await config.headerButtonsToggle.retrieveValue();
        this.toggleHeaderButton(headerEnabled === "true")

        // Mobile support
        if (isMobile()) {
            this.OverrideManager.overrideMobile();
        }

        // Make page visible
        this.showPage();

    }

    #getStylesheet() {
        return document.querySelector('[href*="/static/style.css"]') || document.createElement("link");
    }

    showPage() {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
    }

    setThemeMode(resourcePath) {
        this.#stylesheet.href = chrome.runtime.getURL(resourcePath);
        this.#stylesheet.id = "customStylesheet";
    }

    onSettingsUpdate(event) {
        let headerEnabled = config.headerButtonsToggle.fromSettingsUpdateEvent(event);

        if (headerEnabled != null) {
            this.toggleHeaderButton(headerEnabled === "true");
            return;
        }

        let modeChanged = config.semiLightModeOption.fromSettingsUpdateEvent(event);

        if (modeChanged != null) {
            this.setThemeMode(config[modeChanged].getValue());
        }

    }

    toggleHeaderButton = (headerEnabled) => {

        if (headerEnabled) {
            $("#sharebuttons").css("display", "");
        } else {
            $("#sharebuttons").css("display", "none");
        }

    }

}


class OverrideManager {

    initialize() {
        [
            this.#overrideBody,
            this.#overrideLanguage,
            this.#overrideLogo,
            this.#overrideTaglineInsertMenu,
            this.#overrideHongKongPoster,
            this.#overrideHomePageText,
            this.#overrideLinks,
            this.#resizeCommonInterestsLabel,
            //this.#wrapHeaderButtons
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

    #wrapHeaderButtons() {
        let headerButtons = document.createElement("div");
        headerButtons.id = "header-buttons";
        document.getElementById("header").appendChild(headerButtons);

        $("#sharebuttons").detach().appendTo('#header-buttons')
        $("#onlinecount").detach().appendTo('#header-buttons')

    }

    #resizeCommonInterestsLabel = () => {
        $(".shoulduselikescheckbox").parent().css("font-size", "15px");

    }

    #overrideBody = () => {
        $("body").css("min-height", "").css("top", "")
    }

    #overrideLanguage = () => {
        $(".goog-te-gadget-simple").removeClass("goog-te-gadget-simple").addClass("select-language-button");

    };
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
        //$("#tagline").replaceWith(div);
    };

    #overrideHongKongPoster = () => {
        let newBanner = document.createElement("img");
        newBanner.src = getResourceURL("public/images/DiscordBanner.png");
        newBanner.href = ConstantValues.discordURL;
        newBanner.classList.add("customDiscordBanner");
        $(newBanner).on("click", () => window.open(ConstantValues.discordURL));
        $("img[src$='/static/standwithhk.jpeg']").replaceWith(newBanner);
    }

    #overrideHomePageText() {
        let note = $("#mobilesitenote").get(0);
        if (!note) return;

        note.innerHTML =
            "Thanks for using Chromegle! Like what we've got? " +
            "<a target='_blank' href='https://www.isaackogan.com'>Check out the developer</a> " +
            "for more :)";
    }

}
