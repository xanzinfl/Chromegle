(function() {
    'use strict';

    const OriginalWorker = window.Worker;
    const PatchedWorker = function(scriptURL) {
        if (scriptURL.includes('vision-core.js')) {
            window.postMessage({ type: 'CHROMEGLE_WORKER_INTERCEPTED' }, '*');
            const dummyWorkerCode = `
                self.onmessage = function(e) {
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

                            if (msg.event === 'ban' || msg.event === 'banned') {
                                window.postMessage({ type: `CHROMEGLE_BAN_DETECTED` }, '*');
                                event.stopImmediatePropagation();
                            } else if (msg.event === 'injection') {
                                window.postMessage({ type: `CHROMEGLE_INJECTION_BLOCKED` }, '*');
                                event.stopImmediatePropagation();
                            } else if (msg.event === 'rimage') {
                                window.postMessage({ type: 'CHROMEGLE_REPORT_DETECTED' }, '*');
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

        socket.send = function(data) {
            if (typeof data === 'string' && data.includes('"event":"image"')) {
                window.postMessage({ type: `CHROMEGLE_IMAGE_BLOCKED` }, '*');
                return; 
            }
            return OriginalWebSocketSend.apply(this, arguments);
        };
        return socket;
    };

    PatchedWebSocket.prototype = OriginalWebSocket.prototype;
    Object.defineProperty(window, 'WebSocket', { value: PatchedWebSocket, writable: true, configurable: true });
    window.postMessage({ type: 'CHROMEGLE_SOCKET_INTERCEPTED' }, '*');


})();