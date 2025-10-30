const countryNameToCode = {
    "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "American Samoa": "AS", "Andorra": "AD",
    "Angola": "AO", "Anguilla": "AI", "Antarctica": "AQ", "Antigua and Barbuda": "AG", "Argentina": "AR",
    "Armenia": "AM", "Aruba": "AW", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Bahamas": "BS",
    "Bahrain": "BH", "Bangladesh": "BD", "Barbados": "BB", "Belarus": "BY", "Belgium": "BE", "Belize": "BZ",
    "Benin": "BJ", "Bermuda": "BM", "Bhutan": "BT", "Bolivia": "BO", "Bosnia and Herzegovina": "BA",
    "Botswana": "BW", "Brazil": "BR", "British Indian Ocean Territory": "IO", "British Virgin Islands": "VG",
    "Brunei": "BN", "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI", "Cambodia": "KH", "Cameroon": "CM",
    "Canada": "CA", "Cape Verde": "CV", "Cayman Islands": "KY", "Central African Republic": "CF", "Chad": "TD",
    "Chile": "CL", "China": "CN", "Christmas Island": "CX", "Cocos Islands": "CC", "Colombia": "CO",
    "Comoros": "KM", "Cook Islands": "CK", "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU", "Curacao": "CW",
    "Cyprus": "CY", "Czech Republic": "CZ", "Democratic Republic of the Congo": "CD", "Denmark": "DK",
    "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "East Timor": "TL", "Ecuador": "EC",
    "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Estonia": "EE",
    "Ethiopia": "ET", "Falkland Islands": "FK", "Faroe Islands": "FO", "Fiji": "FJ", "Finland": "FI",
    "France": "FR", "French Polynesia": "PF", "Gabon": "GA", "Gambia": "GM", "Georgia": "GE", "Germany": "DE",
    "Ghana": "GH", "Gibraltar": "GI", "Greece": "GR", "Greenland": "GL", "Grenada": "GD", "Guam": "GU",
    "Guatemala": "GT", "Guernsey": "GG", "Guinea": "GN", "Guinea-Bissau": "GW", "Guyana": "GY", "Haiti": "HT",
    "Honduras": "HN", "Hong Kong": "HK", "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID",
    "Iran": "IR", "Iraq": "IQ", "Ireland": "IE", "Isle of Man": "IM", "Israel": "IL", "Italy": "IT",
    "Ivory Coast": "CI", "Jamaica": "JM", "Japan": "JP", "Jersey": "JE", "Jordan": "JO", "Kazakhstan": "KZ",
    "Kenya": "KE", "Kiribati": "KI", "Kosovo": "XK", "Kuwait": "KW", "Kyrgyzstan": "KG", "Laos": "LA",
    "Latvia": "LV", "Lebanon": "LB", "Lesotho": "LS", "Liberia": "LR", "Libya": "LY", "Liechtenstein": "LI",
    "Lithuania": "LT", "Luxembourg": "LU", "Macau": "MO", "Macedonia": "MK", "Madagascar": "MG", "Malawi": "MW",
    "Malaysia": "MY", "Maldives": "MV", "Mali": "ML", "Malta": "MT", "Marshall Islands": "MH", "Mauritania": "MR",
    "Mauritius": "MU", "Mayotte": "YT", "Mexico": "MX", "Micronesia": "FM", "Moldova": "MD", "Monaco": "MC",
    "Mongolia": "MN", "Montenegro": "ME", "Montserrat": "MS", "Morocco": "MA", "Mozambique": "MZ", "Myanmar": "MM",
    "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Netherlands": "NL", "New Caledonia": "NC", "New Zealand": "NZ",
    "Nicaragua": "NI", "Niger": "NE", "Nigeria": "NG", "Niue": "NU", "Northern Mariana Islands": "MP",
    "North Korea": "KP", "Norway": "NO", "Oman": "OM", "Pakistan": "PK", "Palau": "PW", "Palestine": "PS",
    "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Pitcairn": "PN",
    "Poland": "PL", "Portugal": "PT", "Puerto Rico": "PR", "Qatar": "QA", "Republic of the Congo": "CG",
    "Reunion": "RE", "Romania": "RO", "Russia": "RU", "Rwanda": "RW", "Saint Barthelemy": "BL",
    "Saint Helena": "SH", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC", "Saint Martin": "MF",
    "Saint Pierre and Miquelon": "PM", "Saint Vincent and the Grenadines": "VC", "Samoa": "WS", "San Marino": "SM",
    "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS", "Seychelles": "SC",
    "Sierra Leone": "SL", "Singapore": "SG", "Sint Maarten": "SX", "Slovakia": "SK", "Slovenia": "SI",
    "Solomon Islands": "SB", "Somalia": "SO", "South Africa": "ZA", "South Korea": "KR", "South Sudan": "SS",
    "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD", "Suriname": "SR", "Svalbard and Jan Mayen": "SJ",
    "Swaziland": "SZ", "Sweden": "SE", "Switzerland": "CH", "Syria": "SY", "Taiwan": "TW", "Tajikistan": "TJ",
    "Tanzania": "TZ", "Thailand": "TH", "The Netherlands": "NL", "Togo": "TG", "Tokelau": "TK", "Tonga": "TO",
    "Trinidad and Tobago": "TT", "Tunisia": "TN", "Türkiye": "TR", "Turkmenistan": "TM",
    "Turks and Caicos Islands": "TC", "Tuvalu": "TV", "U.S. Virgin Islands": "VI", "Uganda": "UG", "Ukraine": "UA",
    "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "Uruguay": "UY",
    "Uzbekistan": "UZ", "Vanuatu": "VU", "Vatican": "VA", "Venezuela": "VE", "Vietnam": "VN", "Wallis and Futuna": "WF",
    "Western Sahara": "EH", "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
};


class IPGrabberManager extends Module {

    IP_MENU_TOGGLE_ID = "IP_MENU_TOGGLE";
    IP_MENU_TOGGLE_DEFAULT = "true";

    ENABLE_TAG = "Show Chat-Info";
    DISABLE_TAG = "Hide Chat-Info";

    GEO_MAPPINGS = {
        country: "Country",
        state: "Region",
        city: "City",
        organization: "Provider"
    }

    ipGrabberDiv = null;
    updateClock = null;
    languages = null;

    ipToggleButton = $("<button class='ipLookupButton' style='margin-bottom: 8px; margin-top: 6px;'></button>")
        .on('click', this.onIpToggleButtonClick.bind(this));

    async onIpToggleButtonClick() {
        let showQuery = {[this.IP_MENU_TOGGLE_ID]: this.IP_MENU_TOGGLE_DEFAULT};
        let result = (await chrome.storage.sync.get(showQuery))[this.IP_MENU_TOGGLE_ID];
        const enabled = !(result === "true");

        if (enabled) {
            this.ipToggleButton.html(this.DISABLE_TAG);
            this.ipGrabberDiv.style.display = "";
        } else {
            this.ipToggleButton.html(this.ENABLE_TAG);
            this.ipGrabberDiv.style.display = "none";
        }

        showQuery[this.IP_MENU_TOGGLE_ID] = `${enabled}`;
        await chrome.storage.sync.set(showQuery)
    }

    constructor() {
        super();
        Logger.INFO("IPGrabberManager Loaded");
        this.addEventListener("displayScrapeData", this.onDisplayScrapeData, undefined, window);
        this.loadLanguageList();
        this.injectScrapeScript();
    }

    injectScrapeScript() {
        let script = document.createElement('script');
        script.src = chrome.runtime.getURL('/src/ext/scrape-ips.js');
        script.onload = () => {
            script.remove();
            document.dispatchEvent(new CustomEvent('scrapeAddress'));
        };
        (document.head || document.documentElement).appendChild(script);
    }

    loadLanguageList() {
        $.getJSON(getResourceURL("public/languages.json"), (json) => this.languages = json);
    }

    getFlagEmoji(countryCode) {
        if (!countryCode || countryCode.length !== 2) return '❔';
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    onDisplayScrapeData(event) {
        let unhashedAddress = event["detail"];
        let scrapeQuery = {[this.IP_MENU_TOGGLE_ID]: this.IP_MENU_TOGGLE_DEFAULT};

        chrome.storage.sync.get(scrapeQuery, async (result) => {
            let showData = result[this.IP_MENU_TOGGLE_ID] === "true";
            let hashedAddress = await sha1(unhashedAddress);

            Logger.DEBUG("Scraped IP Address from video chat | Hashed: <%s> Raw: <%s>", hashedAddress, unhashedAddress);
            if (await IPBlockingManager.API.skipBlockedAddress(unhashedAddress)) {
                return;
            }

            await this.geolocateAndDisplay(showData, unhashedAddress, hashedAddress);

        });

    }

    sendChatSeenEvent(seenTimes, unhashedAddress) {
        document.dispatchEvent(new CustomEvent(
            "chatSeenTimes",
            {
                detail: {
                    "uuid": ChatRegistry.getUUID(),
                    "seenTimes": seenTimes,
                    "ipAddress": unhashedAddress
                }
            }
        ));

    }

    async geolocateAndDisplay(showData, unhashedAddress, hashedAddress) {
        let previousQuery = {"PREVIOUS_HASHED_ADDRESS_LIST": {}};

        let result = await chrome.storage.local.get(previousQuery);

        const previouslyHashed = result["PREVIOUS_HASHED_ADDRESS_LIST"];
        const seenTimes = previouslyHashed[hashedAddress] || 0;
        this.sendChatSeenEvent(seenTimes, unhashedAddress);
        this.createAddressContainer(unhashedAddress, hashedAddress, previouslyHashed, showData, seenTimes);

        // Update times seen
        previouslyHashed[hashedAddress] = seenTimes + 1;
        await chrome.storage.local.set({"PREVIOUS_HASHED_ADDRESS_LIST": previouslyHashed});

        // Geolocation request
        let fetchJson;
        try {
            let fetchResult = await fetchWithTimeout(
                `${ConstantValues.GEOapiURL}prod/geoip2?ip_address=${unhashedAddress}`,
                {timeout: 5000}
            );
            fetchJson = await fetchResult.json();
        } catch (ex) {
            await this.onGeolocationRequestError(unhashedAddress);
            return;
        }


        await this.onGeolocationRequestCompleted(unhashedAddress, fetchJson, hashedAddress)

    }

    createAddressContainer(unhashedAddress, hashedAddress, previousHashedAddresses, showData, seenTimes) {

        const innerLogBox = document.getElementsByClassName("chatWindow")[0].parentNode;

        const existingLogItems = innerLogBox.getElementsByClassName("logitem");
        while (existingLogItems.length > 0) {
            existingLogItems[0].remove();
        }

        const logItemDiv = document.createElement("div");
        const seenBeforeDiv = document.createElement("div")

        this.ipGrabberDiv = document.createElement("div");
        this.ipGrabberDiv.style.display = showData ? "" : "none";

        this.ipGrabberDiv.classList.add("logitem");
        logItemDiv.classList.add("logitem");
        seenBeforeDiv.classList.add("logitem");

        const plural = (seenTimes > 1 || seenTimes === 0) ? "s" : "";
        seenBeforeDiv.appendChild(
            $(`<span class='statuslog'>You've seen this person ${seenTimes} time${plural} before.</span>`).get(0)
        );

        this.ipToggleButton.html(showData ? this.DISABLE_TAG : this.ENABLE_TAG);
        innerLogBox.appendChild(this.ipToggleButton.get(0));
        innerLogBox.appendChild(this.ipGrabberDiv);
        innerLogBox.append(seenBeforeDiv);

    }

    async insertUnhashedAddress(unhashedAddress, isOwner = false) {
        let ipSpoiler = await (new IPAddressSpoiler(unhashedAddress)).setup();

        let ipMessage = this.createLogBoxMessage(
            "address_data", "IP Address: ", ipSpoiler.get()
        );

        if (!isOwner) {
            ipMessage.appendChild(ButtonFactory.ipBlockButton(unhashedAddress));
        }

        this.ipGrabberDiv.appendChild(ipMessage); // Add the IP first
    }

    async onGeolocationRequestError(unhashedAddress) {
        await this.insertUnhashedAddress(unhashedAddress);
        sendErrorLogboxMessage("Geolocation failed, try again later or contact us through our discord!");
    }

    async skipBlockedCountries(countrySkipEnabled, geoJSON) {

        const code = geoJSON["country_code"] || geoJSON["country_code3"]; 

        if (!code) {
             Logger.DEBUG("Country Skip Check: No valid country code found in geoJSON. Exiting.");
             return false;
        }

        const defaultCountryList = "AE,AL,AM,BD,DZ,EG,GR,ID,IN,IQ,JO,KE,KW,LB,LK,LY,MA,MT,MY,NG,NP,PH,PK,SA,SC,TN,TR,QA,YE";
        const blockedCountriesString = typeof Settings?.retrieveChromeValue === 'function' ? await Settings.retrieveChromeValue("COUNTRY_SKIP_FIELD", defaultCountryList) : defaultCountryList;
        const blockedCountries = blockedCountriesString.toUpperCase().split(',').map(c => c.trim()).filter(Boolean);

        const countryBlocked = blockedCountries.includes(code.toUpperCase());

        Logger.DEBUG(`Country Skip Check: Is country ${code} blocked? ${countryBlocked}`);

        if (!countryBlocked) {
            return false;
        }

        const uuidToSkip = ChatRegistry.getUUID();
        if (!uuidToSkip) {
             Logger.WARNING("Country skip triggered for blocked country, but no active chat UUID found.");
             return false;
        }

        Logger.INFO(`Skipping blocked country ${code} in chat ${uuidToSkip}.`);

        performDebouncedSkip(uuidToSkip);

        if (ChatRegistry.getUUID() === uuidToSkip) {
            Logger.DEBUG("Still in chat <%s>, attempting to send country skip message.", uuidToSkip);

            let errorMsgElement = sendErrorLogboxMessage(`Detected user from blocked country ${geoJSON["country"]} (${code}), skipped chat.`);

            if (errorMsgElement) {
                errorMsgElement.classList.add("chromegle-ip-logitem");
                Logger.DEBUG("Added cleanup class to country skip message for <%s>.", uuidToSkip);
            } else {
                 Logger.WARNING("Failed to send country skip message for <%s>, logbox might have disappeared.", uuidToSkip);
            }

        } else {
            Logger.INFO("Chat changed too quickly after country skip for <%s>. Skip message suppressed.", uuidToSkip);
        }

        return true;
    }

    containsValidKeys(obj, ...keys) {
        let keyList = Object.keys(obj);

        for (let key of keys) {
            if (!keyList.includes(key) || !obj[key] || obj[key] === '') {
                return false;
            }
        }
        return true;
    }

    /**
     *
     * @param unhashedAddress 192.168.0.1 formatted IP
     * @param hashedAddress Hashed IP address
     * @param geoJSON.ip 192.168.0.1 formatted IP
     * @param geoJSON JSON payload from API
     * @param geoJSON.owner true|false Whether owner is there
     * @param geoJSON.chromegler true|false Whether user is Chromegler
     * @param geoJSON.longitude Longitude
     * @param geoJSON.latitude Latitude
     * @param geoJSON.country Country
     * @param geoJSON.country_code CA formatted country code
     * @param geoJSON.accuracy Kilometre accuracy of geolocation
     * @param geoJSON.timezone Request timezone
     */
    async onGeolocationRequestCompleted(unhashedAddress, geoJSON, hashedAddress) {
        await this.insertUnhashedAddress(geoJSON?.ip || unhashedAddress, geoJSON?.owner || false);

        const countryName = geoJSON.country;
        const countryCode = countryNameToCode[countryName] || 'XX';
        geoJSON.country_code = countryCode;

        const countrySkipEnabled = typeof Settings?.retrieveChromeValue === 'function' ? await Settings.retrieveChromeValue("COUNTRY_SKIP_TOGGLE", "false") === "true" : false;

        if (await this.skipBlockedCountries(countrySkipEnabled, geoJSON)) {
            if (this.ipGrabberDiv) this.ipGrabberDiv.remove();
            return;
        }

        // Log information
        Logger.DEBUG(
            "Received IP Scraping data for chat UUID <%s> from the Chromegle web-server as the following JSON payload: \n\n%s",
            ChatRegistry.getUUID(),
            JSON.stringify(geoJSON, null, 2)
        );

        // Display geolocation-based fields
        await this.displayGeolocationFields(geoJSON, hashedAddress);

    }

    insertLogboxMessage(elementId, label, ...values) {
        this.ipGrabberDiv.appendChild(
            this.createLogBoxMessage(elementId, label, ...values)
        )
    }

    reduceData(num) {
        return parseFloat(num).toFixed(2);
    }

    async displayGeolocationFields(geoJSON, hashedAddress) {
        this.updateClock = new ChatUpdateClock(ChatRegistry.getUUID(), 1000);

        // If there is longitude and latitude included, add that too
        // In chat, we display a less specific (rounded to 2 decimals) version, to protect privacy.
        if (this.containsValidKeys(geoJSON, "longitude", "latitude")) {
            this.insertLogboxMessage(
                "long_lat_data", "Coordinates: ", `${this.reduceData(geoJSON.longitude)}/${this.reduceData(geoJSON.latitude)} `,
                `<a class="ipMapsButton" href='https://maps.google.com/maps?q=${geoJSON.latitude},${geoJSON.longitude}' target="_blank">(Google Maps)</a>`
            )
        }

        Object.keys(this.GEO_MAPPINGS).forEach((key) => {
            const entry = geoJSON[key];
            if (!this.containsValidKeys(geoJSON, key)) {
                return;
            }

            this.insertLogboxMessage(`${key}_data`, `${this.GEO_MAPPINGS[key]}: `, entry);

        });

        // Accuracy Information
        if (this.containsValidKeys(geoJSON, "accuracy")) {
            this.insertLogboxMessage("accuracy_data", "Accuracy: ", `${geoJSON.accuracy} km radius`)
        }

        // Country Flag & Languages
        if (this.containsValidKeys(geoJSON, "country_code", "country")) {

            // Country Flag
            $("#country_data").get(0).appendChild(
                $(`<span> <span class='flagText nceFont'>${this.getFlagEmoji(geoJSON.country_code)}</span></span>             
                `).get(0)
            );

            // Languages
            if (this.languages != null) {
                let userLanguages = this.languages[geoJSON.country_code]?.join(", ") || null;
                if (userLanguages != null) {
                    this.insertLogboxMessage(
                        "language_data", "Language(s): ", userLanguages
                    )
                }
            }
        }

        // Local Time
        if (this.containsValidKeys(geoJSON, "timezone")) {
            this.insertLogboxMessage(
                "local_time_data", "Local Time: ", this.getFormattedTime(geoJSON.timezone)
            );

            // Update time for duration of call
            this.updateClock.addUpdate(
                (date) => {
                    let timeData = $("#local_time_data").get(0);
                    if (timeData) timeData.childNodes[1].innerHTML = this.getFormattedTime(geoJSON.timezone, date);
                }
            )

        }

        // Call Time
        {
            this.insertLogboxMessage(
                "call_time_data", "Time In Call: ", "00:00"
            )

            this.updateClock.addUpdate(
                (date, startTime) => {
                    let timeData = $("#call_time_data").get(0);
                    if (timeData) timeData.childNodes[1].innerHTML = this.formatElapsedTime(date, startTime);
                }
            )

        }

        // Note
        if (!geoJSON.owner) {
            let note = new Note();
            await note.setup(hashedAddress);

            this.insertLogboxMessage(
                "profile_note_data", "Note: ", note.element
            )
        }

    }

    getFormattedTime(timezone, date = new Date()) {
        const options = {
            timeZone: timezone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }

        return date.toLocaleString("en-US", options);
    }

    formatElapsedTime(currentTime, startTime) {
        const diff = new Date(currentTime - startTime);

        const hours = diff.getUTCHours();
        const minutes = diff.getUTCMinutes().toString().padStart(2, "0");
        const seconds = diff.getUTCSeconds().toString().padStart(2, "0");

        return `${hours > 0 ? hours + ":" : ""}${minutes}:${seconds}`;
    }

    createLogBoxMessage(elementId, label, ...values) {

        // Create a new container for the entry
        let youMsgClass = document.createElement("p");
        youMsgClass.classList.add("youmsg");
        youMsgClass.id = elementId;

        // Set the field (bolded part)
        let field = document.createElement("strong");
        field.classList.add("statusItem");
        field.innerText = label + "";

        // Set the result (answer part)
        let entry = document.createElement("span");
        for (let value of values) {
            if (typeof value === 'string') {
                entry.innerHTML += value;
            } else {
                entry.appendChild(value);
            }
        }

        // Add the status field & entry to the main entry
        youMsgClass.appendChild(field);
        youMsgClass.appendChild(entry);

        return youMsgClass;

    }
}