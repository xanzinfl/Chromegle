class TopicSyncManager extends Module {
    constructor() {
        super();
        this.loadFromSync();
        this.addEventListener("beforeunload", this.beforeUnload, undefined, window);
    }

    loadFromSync() {
        chrome.storage.sync.get(["STORED_TOPIC_LIST"], (val) => {
            const cachedTopics = val["STORED_TOPIC_LIST"];
            const localTopics = JSON.parse(localStorage.getItem("interests") || "[]");

            const cachedString = JSON.stringify(cachedTopics);
            const localString = JSON.stringify(localTopics);

            Logger.DEBUG("Cached Topics: %s | Local Topics: %s", cachedString, localString);

            if (cachedString !== localString && cachedTopics != null) {
                localStorage.setItem("interests", cachedString);
                Logger.INFO("Updated localStorage interests on <%s> event: %s", "pageload", cachedString);
                window.location.reload();
            }
        });
    }

    saveToSync(eventType = "manual") {
        const localTopics = JSON.parse(localStorage.getItem("interests") || "[]");

        try {
            chrome.storage.sync.set({ "STORED_TOPIC_LIST": localTopics }).then(() => {
                Logger.INFO("Updated sync-storage cached topics on <%s> event: %s", eventType, JSON.stringify(localTopics));
            });
        } catch (err) {
            Logger.WARN("Failed to update sync-storage (context invalidated?): %s", err);
        }
    }

    beforeUnload(event) {
        localStorage.setItem("__lastSyncedInterests__", localStorage.getItem("interests") || "[]");
        Logger.DEBUG("Saved fallback local backup before unload: %s", localStorage.getItem("interests"));
    }
    
    onPageStarted(event) {
        this.saveToSync(event?.type || "chatstart");
    }
}
