class TopicSyncManager extends Module {
    constructor() {
        super();
        this.loadFromSync();
        this.addEventListener("beforeunload", this.beforeUnload, undefined, window);
    }

    loadFromSync() {
        chrome.storage.sync.get(["STORED_TOPIC_LIST"], (val) => {
            const cachedTopics = Array.isArray(val["STORED_TOPIC_LIST"]) ? val["STORED_TOPIC_LIST"] : [];
            const localTopics = JSON.parse(localStorage.getItem("interests") || "[]");

            const cachedString = JSON.stringify(cachedTopics);
            const localString = JSON.stringify(localTopics);

            Logger.DEBUG("Cached Topics: %s | Local Topics: %s", cachedString, localString);

            if (cachedTopics.length === 0 && localTopics.length > 0) {
                Logger.INFO("Sync empty; saving local topics to Chrome Sync.");
                this.saveToSync("initialUpload");
                return;
            }

            if (localTopics.length === 0 && cachedTopics.length > 0) {
                localStorage.setItem("interests", cachedString);
                Logger.INFO("Local interests empty; restored from Chrome Sync: %s", cachedString);
                window.location.reload();
                return;
            }

            if (cachedString !== localString && cachedTopics.length > 0) {
                Logger.INFO("Differences detected; updating localStorage from Chrome Sync.");
                localStorage.setItem("interests", cachedString);
                window.location.reload();
                return;
            }

            Logger.DEBUG("No sync changes required; interests in sync.");
        });
    }

    saveToSync(eventType = "manual") {
        const localTopics = JSON.parse(localStorage.getItem("interests") || "[]");

        try {
            chrome.storage.sync.set({ "STORED_TOPIC_LIST": localTopics }).then(() => {
                Logger.INFO("Updated sync-storage cached interests on <%s> event: %s", eventType, JSON.stringify(localTopics));
            });
        } catch (err) {
            Logger.WARN("Failed to update sync-storage (context invalidated?): %s", err);
        }
    }

    beforeUnload(event) {
        localStorage.setItem("__lastSyncedInterests__", localStorage.getItem("interests") || "[]");
        this.saveToSync("beforeUnload");
        Logger.DEBUG("Saved fallback and sync before unload: %s", localStorage.getItem("interests"));
    }

    onPageStarted(event) {
        this.saveToSync(event?.type || "chatStarted");
    }
}
