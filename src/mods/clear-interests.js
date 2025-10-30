class ClearInterestsManager extends Module {
    constructor() {
        super();
        this.insertButton();
    }

    insertButton() {
        const targetContainer = document.querySelector(".interestsEnter");
        if (!targetContainer) return;

        const button = this.createElement();
        button.style.marginLeft = "8px";

        const textarea = targetContainer.querySelector("#interestBox");
        if (textarea) {
            textarea.parentElement.appendChild(button);
        } else {
            targetContainer.appendChild(button);
        }
    }

    createElement() {
        const button = document.createElement("button");
        button.className = "clearInterestsButton";
        button.textContent = "(Clear Interests)";
        button.style.cursor = "pointer";
        button.style.marginTop = "6px";
        button.addEventListener("click", this.onButtonClick.bind(this));
        return button;
    }

    onButtonClick() {
        const removeButtons = document.querySelectorAll(".interestTag .removeInterest");

        removeButtons.forEach(btn => btn.click());
        try {
            chrome.storage.sync.set({ "STORED_TOPIC_LIST": null }).then(() => {
                Logger.INFO("Cleared sync-storage cached interests.");
            });
        } catch (err) {
            Logger.WARN("Failed to update sync-storage (context invalidated?): %s", err);
        }

    }
}
