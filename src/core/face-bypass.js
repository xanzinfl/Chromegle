(function() {
    'use strict';
    function showReportNotification() {
        const existingNotification = document.getElementById('chromegle-report-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notificationDiv = document.createElement('div');
        notificationDiv.id = 'chromegle-report-notification'; // ID for Selenium
        notificationDiv.style.position = 'absolute';
        notificationDiv.style.top = '75px'; // Adjust as needed
        notificationDiv.style.left = '10px'; // Adjust as needed
        notificationDiv.style.zIndex = '99999';
        notificationDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.85)';
        notificationDiv.style.color = 'white';
        notificationDiv.style.padding = '15px';
        notificationDiv.style.borderRadius = '8px';
        notificationDiv.style.border = '1px solid darkred';
        notificationDiv.style.fontSize = '16px';
        notificationDiv.style.fontWeight = 'bold';
        notificationDiv.style.textAlign = 'center';
        notificationDiv.style.maxWidth = 'calc(50% - 20px)';
        notificationDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        notificationDiv.style.pointerEvents = 'none';

        let message = 'Someone reported you.';

        notificationDiv.textContent = message;
        document.body.appendChild(notificationDiv);

        setTimeout(() => {
            if (notificationDiv) {
                notificationDiv.remove();
            }
        }, 10000);
    }


    const OriginalWorker = window.Worker;
    const PatchedWorker = function(scriptURL) {
        if (scriptURL.includes('vision-core.js')) {
            console.log(`[INFO] (Chromegle) Face detection worker intercepted.`);
            const dummyWorkerCode = `
                self.onmessage = function(e) {
                    // Always report one face detected
                    self.postMessage({ action: 'faceDetections', faces: 1 });
                };
            `;
            const blob = new Blob([dummyWorkerCode], { type: 'application/javascript' });
            return new OriginalWorker(URL.createObjectURL(blob));
        }
        return new OriginalWorker(scriptURL);
    };
    PatchedWorker.prototype = OriginalWorker.prototype;
    Object.defineProperty(window, 'Worker', { value: PatchedWorker, writable: true, configurable: true });
    console.log(`[INFO] (Chromegle) Face Detection Bypass Loaded.`);

    const OriginalWebSocket = window.WebSocket;
    const OriginalWebSocketSend = OriginalWebSocket.prototype.send;

    const PatchedWebSocket = function(...args) {
        const socket = new OriginalWebSocket(...args);
        let originalOnMessage = null;

        Object.defineProperty(socket, 'onmessage', {
            get: () => originalOnMessage,
            set: (listener) => {
                originalOnMessage = listener;
                socket.addEventListener('message', (event) => {
                    let shouldCallOriginal = true;
                    try {
                        if (typeof event.data === 'string' && event.data.startsWith('{')) {
                            const msg = JSON.parse(event.data);

                            if (msg.event === 'rimage') {
                                console.warn(`[WARN] (Chromegle) Report detected! (rimage event)`);
                                showReportNotification();
                            }

                        }
                    } catch (err) {
                        console.log(`[ERROR] (Chromegle) Error processing WebSocket message`, err);
                    }
                    if (shouldCallOriginal && originalOnMessage) {
                        try {
                            originalOnMessage.call(socket, event);
                        } catch (err) {
                            console.log(`[ERROR] (Chromegle) Error in original onmessage handler`, err);
                        }
                    }
                });
            },
            configurable: true,
            enumerable: true
        });

        socket.send = OriginalWebSocketSend.bind(socket);
        return socket;
    };

    PatchedWebSocket.prototype = OriginalWebSocket.prototype;
    Object.defineProperty(window, 'WebSocket', { value: PatchedWebSocket, writable: true, configurable: true });
    console.log(`[INFO] (Chromegle) Websocket Intercepted`);

})();