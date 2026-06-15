/** @type {SettingsManager} */
let Settings;

/** @type {ChatRegistryManager} */
let ChatRegistry;

/** @type {Object} */
let Manifest;

let UUID;

async function checkBan() {
    const res = await fetch(`${ConstantValues.apiURL}verify`, { headers: { UUID }});
    const data = await res.json();
    if (data.banned === true) {
        const expiresText = data.expires
            ? new Date(data.expires).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
            : 'Never';

        const logoURL = chrome.runtime.getURL('public/images/HomeButton.png');
        const supportURL = ConstantValues.discordURL;

        document.documentElement.innerHTML = `
            <html>
            <head>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background-color: rgb(10, 10, 10);
                        font-family: sans-serif;
                        color: #d0d0d0;
                    }
                    .ban-card {
                        background-color: rgb(29, 29, 31);
                        border: 1px solid #3a3a3a;
                        border-radius: 12px;
                        padding: 36px 40px;
                        max-width: 480px;
                        width: 90%;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
                        text-align: center;
                    }
                    .ban-logo {
                        width: 265px;
                        height: 57px;
                        margin: 0 auto 20px;
                        display: block;
                    }
                    .ban-title {
                        font-size: 22px;
                        font-weight: bold;
                        color: #208ffe;
                        margin-bottom: 6px;
                    }
                    .ban-subtitle {
                        font-size: 13px;
                        color: #888;
                        margin-bottom: 28px;
                    }
                    .ban-divider {
                        border: none;
                        border-top: 1px solid #3a3a3a;
                        margin-bottom: 24px;
                    }
                    .ban-fields {
                        display: flex;
                        flex-direction: column;
                        gap: 14px;
                        text-align: left;
                    }
                    .ban-field {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        gap: 12px;
                    }
                    .ban-field-label {
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                        color: #666;
                        white-space: nowrap;
                        flex-shrink: 0;
                    }
                    .ban-field-value {
                        font-size: 13.5px;
                        color: #c8c8d8;
                        text-align: right;
                        word-break: break-all;
                    }
                    .ban-field-value.reason {
                        color: #e08a55;
                        font-weight: 600;
                    }
                    .ban-field-value.expires-never {
                        color: #e05555;
                        font-weight: 600;
                    }
                    .ban-field-value.monospace {
                        font-family: monospace;
                        font-size: 12px;
                        color: #888;
                    }
                    .ban-footer {
                        margin-top: 28px;
                        font-size: 12px;
                        color: #555;
                    }
                    .ban-footer a {
                        color: #208ffe;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="ban-card">
                    <img class="ban-logo" src="${logoURL}" alt="Chromegle">
                    <div class="ban-title">You Have Been Banned</div>
                    <div class="ban-subtitle">You have been banned from using Chromegle. Disable the extension to continue.</div>
                    <hr class="ban-divider">
                    <div class="ban-fields">
                        <div class="ban-field">
                            <span class="ban-field-label">Reason</span>
                            <span class="ban-field-value reason">${data.reason ?? 'No reason provided'}</span>
                        </div>
                        <div class="ban-field">
                            <span class="ban-field-label">Banned By</span>
                            <span class="ban-field-value">${data.bannedBy ?? 'Unknown'}</span>
                        </div>
                        <div class="ban-field">
                            <span class="ban-field-label">Expires</span>
                            <span class="ban-field-value ${data.expires ? '' : 'expires-never'}">${expiresText}</span>
                        </div>
                        <div class="ban-field">
                            <span class="ban-field-label">Ban ID</span>
                            <span class="ban-field-value monospace">${data.banId ?? 'N/A'}</span>
                        </div>
                    </div>
                    <div class="ban-footer">If you believe this is a mistake, contact <a href="${supportURL}" target="_blank">support</a>.</div>
                </div>
            </body>
            </html>
        `;
        return true;
    }
    return false;
}

(async function () {
    $("html").css("visibility", "visible");
    Logger.INFO("Extention Starting, Loading Modules")

    checkBan();

    runDataLoaders(
        UUIDLoader,
        ManifestLoader,
        TipsLoader
    )

    loadModules(
         BypassManager,
         IPBlockingManager,
         TopicSyncManager,
         ChatRegistryManager,
         PasteMenu,
         ChatManager,
         FilterManager,
         AutoMessageManager,
         ReconnectManager,
         IPGrabberManager,
         SpeechEngineManager,
         SettingsManager,
         TimerSkipManager,
         RepeatSkipManager,
         BroadcastManager,
    );

    window.addEventListener("DOMContentLoaded", () => {
        loadModules(
            ThemeManager,
            ClearInterestsManager,
            UserCountManager,
        );
    });
})();