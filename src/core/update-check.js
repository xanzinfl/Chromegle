const MANIFEST_URL = "https://raw.githubusercontent.com/xanzinfl/Chromegle/refs/heads/master/manifest.json";

function showUpdateNotification(remoteVersion, time, msg) {
    const existingNotification = document.getElementById('chromegle-update-notification');
    if (existingNotification) existingNotification.remove();

    const notificationDiv = document.createElement('div');
    notificationDiv.id = 'chromegle-update-notification';
    notificationDiv.style.position = 'absolute';
    notificationDiv.style.top = '75px';
    notificationDiv.style.left = '10px';
    notificationDiv.style.zIndex = '99999';
    notificationDiv.style.backgroundColor = '#208ffea1';
    notificationDiv.style.color = 'white';
    notificationDiv.style.padding = '15px';
    notificationDiv.style.borderRadius = '8px';
    notificationDiv.style.border = '1px solid lightblue';
    notificationDiv.style.fontSize = '16px';
    notificationDiv.style.fontWeight = 'bold';
    notificationDiv.style.textAlign = 'center';
    notificationDiv.style.maxWidth = 'calc(50% - 20px)';
    notificationDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
    notificationDiv.style.pointerEvents = 'auto';

    const message = document.createElement('div');
    message.textContent = msg || `A new update is available! v${remoteVersion}`;
    notificationDiv.appendChild(message);

    const button = document.createElement('button');
    button.textContent = 'GitHub';
    button.style.marginTop = '10px';
    button.style.cursor = 'pointer';
    button.style.fontWeight = 'bold';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.padding = '6px 12px';
    button.style.background = 'white';
    button.style.color = '#208ffe';
    button.style.pointerEvents = 'auto';
    button.addEventListener('click', () => {
        window.open('https://github.com/xanzinfl/Chromegle/releases/latest', '_blank');
    });

    const button2 = document.createElement('button');
    button2.textContent = 'Chrome Web Store';
    button2.style.marginTop = '10px';
    button2.style.cursor = 'pointer';
    button2.style.fontWeight = 'bold';
    button2.style.border = 'none';
    button2.style.borderRadius = '5px';
    button2.style.padding = '6px 12px';
    button2.style.background = 'white';
    button2.style.color = '#208ffe';
    button2.style.pointerEvents = 'auto';
    button2.addEventListener('click', () => {
        window.open('https://chromewebstore.google.com/detail/chromegle-umingle-ip-clie/kaahpgbohjcchoicicchgahmolocanbp', '_blank');
    });


    if (!msg) {
        notificationDiv.appendChild(button);
        notificationDiv.appendChild(button2);
    }
    document.body.appendChild(notificationDiv);

    setTimeout(() => {
        if (notificationDiv) notificationDiv.remove();
    }, time);
}


async function checkForUpdate() {
    try {
        // Get local manifest version
        const localManifest = chrome.runtime.getManifest();
        const localVersion = localManifest.version;

        // Fetch remote manifest version
        const response = await fetch(MANIFEST_URL, { cache: "no-store" });
        if (!response.ok) {
            Logger.ERROR("[UpdateCheck] Failed to fetch remote manifest");
        }

        const remoteManifest = await response.json();
        const remoteVersion = remoteManifest.version;

        Logger.DEBUG("[UpdateCheck] Local: %s | Remote: %s", localVersion, remoteVersion);

        // Compare versions
        if (isVersionNewer(remoteVersion, localVersion)) {
            Logger.INFO("[UpdateCheck] Update available: %s", remoteVersion);
            showUpdateNotification(remoteVersion, 20000);
        } else if (isVersionNewer(localVersion, remoteVersion)) {
            Logger.INFO("Welcome beta tester!");
            showUpdateNotification(0, 5000, "Welcome beta tester!");
        } else { 
            Logger.INFO("[UpdateCheck] No update available.");
        }

    } catch (err) {
        Logger.WARNING("[UpdateCheck] Failed: %s", err);
    }
}

function isVersionNewer(remote, local) {
    const r = remote.split(".").map(Number);
    const l = local.split(".").map(Number);
    for (let i = 0; i < Math.max(r.length, l.length); i++) {
        const diff = (r[i] || 0) - (l[i] || 0);
        if (diff > 0) return true;
        if (diff < 0) return false;
    }
    return false;
}

checkForUpdate();

setInterval(checkForUpdate, 1000 * 60 * 60 * 5);
