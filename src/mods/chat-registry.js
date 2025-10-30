class ChatRegistryManager extends Module {

    constructor() {
        super();

        ChatRegistry = this;
        this.#observer.observe(document, {subtree: true, childList: true, attributes: true});
        window.addEventListener("load", () => this.onPageLoad());
    }

    #setUUID = () => this.#chatUUID = shortUuid();
    #clearUUID = () => this.#chatUUID = null;

    #observer = new MutationObserver(this.onMutationObserved.bind(this));
    #isChatting = false;
    #isVideoChat = null;
    #pageStarted = false;
    #chatUUID = null;
    #videoChatLoaded = false;

    /** @type ChatMessage[] */
    #messages = [];

    userMessages() {
        return this.#messages.filter(msg => msg.isUser)
    }

    strangerMessages() {
        return this.#messages.filter(msg => msg.isStranger());
    }

    isVideoChatLoaded = () => this.#videoChatLoaded;
    isChatting = () => this.#isChatting;
    isVideoChat = () => this.#isVideoChat;
    isTextChat = () => !this.#isVideoChat;
    pageStarted = () => this.#pageStarted;
    getUUID = () => this.#chatUUID;

    onPageLoad() {
        if (!this.pageStarted()) {
            this.#pageStarted = true;

            this.#isVideoChat = $("#videowrapper").get(0) != null;

            document.dispatchEvent(new CustomEvent("pageStarted", {
                detail: {
                    button: null,
                    isVideoChat: this.isVideoChat()
                }
            }));
        }
    }


    onMutationObserved(mutations) {

        // Should be LAST b.c. it matters if the chat has ended
        mutations.sort((a, b) => {
            if (a.target.id === "othervideospinner") {
                return 1;
            }
            else if (b.target.id === "othervideospinmner") {
                return -1;
            }

            return -1;

        });

        for (let mutation of mutations) {
            mutation.addedNodes?.forEach(node => {
                if (
                    node.nodeType === 1 &&
                    node.classList.contains("information")
                ) {
                    this.onChatMutationRecord({ target: node });
                }
            });

            this.onMutationRecord(mutation);
        }

    }

    onMutationRecord(mutationRecord) {

        // Chat Loaded
        if (mutationRecord.target.id === "othervideospinner") {

            if (mutationRecord.target.style.display === "none" && this.isChatting() && !this.#videoChatLoaded) {
                this.#videoChatLoaded = true;
                document.dispatchEvent(new CustomEvent("videoChatLoaded"));
            }
            return;
        }

        // Chat failed
        if (mutationRecord.target["innerText"] != null) {
            if (mutationRecord.target["innerText"].includes("Server was unreachable for too long")) {
                Logger.ERROR("Chat failed to connect, you are likely using a VPN or proxy which Omegle has detected and blocked.")
                document.dispatchEvent(new CustomEvent('chatFailedConnect', {detail: mutationRecord.target}));
                this.#isChatting = false;
                this.#clearUUID();
                return;
            }
        }

        // Disconnect button
        if (mutationRecord.target.classList.contains('skipButton')) {
            document.dispatchEvent(new CustomEvent('skipButtonMutation', {detail: mutationRecord}))
        }

        // REGULAR STUFF
        if (mutationRecord.target.classList.contains("information")) {
            this.onChatMutationRecord(mutationRecord);
        }

        // Chat Log
        for (const node of mutationRecord.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;

            if (
                node.classList.contains("tempMessage") ||
                node.querySelector("span.You") ||
                node.querySelector("span.Stranger")
            ) {
                this.onLogItemAdded(node);
            }
        }


    }

    onLogItemAdded(logItemNode) {
        Logger.DEBUG('log trigger', logItemNode.outerHTML);

        const span = logItemNode.querySelector("span");
        if (!span) {
            Logger.WARNING('No span found in chat message');
            return;
        }

        const isUser = span.classList.contains("You");
        const isStranger = span.classList.contains("Stranger");

        if (isUser || isStranger) {
            const idx = this.#messages.length;

            const rawText = logItemNode.textContent || "";
            const label = span.textContent || "";
            const messageText = rawText.replace(label, "").trim();

            const message = new ChatMessage(isUser, messageText, logItemNode, idx);
            this.#messages.push(message);

            document.dispatchEvent(new CustomEvent("chatMessage", { detail: message }));
            Logger.DEBUG(`Captured message #${idx + 1} (${isUser ? "You" : "Stranger"}): ${messageText}`);
        }
    }



    containsOneOfClasses(node, ...classes) {

        if (!node?.classList) {
            return false;
        }

        for (let CLASS of classes) {
            if (node.classList.contains(CLASS)) {
                return true;
            }
        }

        return false;
    }


    onChatMutationRecord(mutationRecord) {
        const el = mutationRecord.target;

        if (
            el.id === "information" &&
            el.closest("#mainMessages") == null &&
            el.textContent.includes("You're now chatting with a random stranger")
        ) {
            if (!this.#isChatting) {
                this.#isChatting = true;
                this.#videoChatLoaded = false;
                this.#setUUID();
                Logger.INFO("Chat Started: UUID <%s>", this.getUUID());
                document.dispatchEvent(new CustomEvent("chatStarted", {
                    detail: {
                        button: el,
                        uuid: this.getUUID(),
                        isVideoChat: this.isVideoChat()
                    }
                }));
            }
            return;
        }

        if (
            el.classList.contains("information") &&
            el.closest("#mainMessages") == null &&
            el.textContent.includes("Looking for someone you can chat with...")
        ) {
            if (this.#isChatting) {
                Logger.INFO("Chat Ended: UUID <%s>", this.getUUID());
                const uuid = this.getUUID();
                this.#isChatting = false;
                this.#clearUUID();
                this.#messages = [];
                document.dispatchEvent(new CustomEvent("chatEnded", {
                    detail: {
                        button: el,
                        uuid,
                        isVideoChat: this.isVideoChat()
                    }
                }));
            }
        }
    }

}

class ChatMessage {

    constructor(isUser, content, element, index) {

        /** @type boolean */
        this.isUser = isUser;

        /** @type string */
        this.content = content;

        /** @type HTMLElement */
        this.element = element;

        /** @type Number */
        this.messageNumber = index + 1;

        /** @type HTMLSpanElement|null */
        this.spanElement = this.element?.querySelector("span") || null;

    }

    getTextNodes() {
        let childNodes = this.spanElement?.childNodes || [];
        let textNodes = [];

        for (let childNode of childNodes) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                textNodes.push(childNode);
            }
        }

        return textNodes;
    }

    isStranger() {
        return !this.isUser;
    }

}
