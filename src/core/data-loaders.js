class DataLoader {

    async fetchJSON(url) {
        return (await fetch(url)).json();
    }

    async fetchText(url) {
        return (await fetch(url)).text();
    }

    async run() {}

}

class UUIDLoader extends DataLoader {
    async run() {
        const result = await chrome.storage.local.get({ UUID: null });
        UUID = result.UUID;

        if (!UUID) {
            UUID = crypto.randomUUID();
            await chrome.storage.local.set({ UUID: UUID });
        }
    }
}

class ManifestLoader extends DataLoader {

    async run() {
        Manifest = await this.fetchJSON(getResourceURL("manifest.json"));
    }

}

class TipsLoader extends DataLoader {

    async run() {
        ConstantValues._helpfulTips = await this.fetchJSON(ConstantValues.apiURL + "tips");
    }

}
