class ChatManager extends Module {

    constructor() {
        super();

        this.addElementListener(document, "click", this.onClick);
        this.addElementListener(document, "keyup", this.onKeyUp);

    }

    onKeyUp(event) {
        if (event.key === "Escape") this.onClick()
    }

    onChatStarted(event) {

        let logItems = document.getElementsByClassName("information");

        for (let log of logItems) {
            log.classList.add("tip-message");
            log.innerHTML = `Thanks for using Chromegle! ${ConstantValues.getHelpfulTip()}`;
        }

        if (event["detail"]["isVideoChat"]) {
            let self = $("#selfvideo").get(0);
            if (self !== null) {
                $(self).css("z-index", "");
            }

        }
    }

    onClick() {

        // Only when not chatting, but in the chat menu (between chats)
        if (ChatRegistry.isChatting() || $(".chatmsg").get(0) == null) {
            return;
        }

        this.cleanMidChat();
    }

    onChatFailedConnect(event) {
        this.onChatEnded();
        this.cleanMidChat();

        event["detail"].innerHTML = (`
            <p class="statuslog">
                Chromegle: Unable to connect to Uhmegle. You are likely banned</a>
                due to a VPN or proxy, try a different one to continue.
            </p>
        `);
    }

    onChatEnded() {

        const autoReconnect = $("label:contains('Auto-reroll')");

        if (autoReconnect.get(0) != null) autoReconnect.css("color", "");
        const stopReconnect = $('input[type="button"][value="Stop"]');

        if (stopReconnect.get(0) != null) {

            $(stopReconnect)
                .css("border", "none")
                .css("padding", "5px")
                .val("Click to Disable")
                .get(0).classList.add("conversationgreat");
        }
    }

    cleanMidChat() {

        // Remove auto-reroll styling
        $("label:contains('Auto-reroll')")
            .css("color", "");
    }
}







