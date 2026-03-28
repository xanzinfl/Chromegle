class DataLoader {

    async fetchJSON(url) {
        return (await fetch(url, {
            headers: { 'x-client-version': "5.1.1" } 
        })).json();
    }

    async fetchText(url) {
        return (await fetch(url, {
            headers: { 'x-client-version': "5.1.1" }
        })).text();
    }

    async run() {}

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