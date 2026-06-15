(function() {
    'use strict';

    const OriginalWorker = window.Worker;
    const PatchedWorker = function(scriptURL) {
        if (scriptURL.includes('vision.js')) {
            window.postMessage({ type: 'CHROMEGLE_WORKER_INTERCEPTED' }, '*');
            const dummyWorkerCode = `
                self.onmessage = function(e) {
                    const jobId = e.data.job_id;

                    const k = Math.imul(jobId * 10 + 1, 837921547) >>> 0;

                    self.postMessage({
                        action: 'f_res',
                        k
                    });
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

                            if (msg.event === 'rimage') {
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
            if (typeof data === 'string' && data.includes('"event":"findPeer"')) {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.description && parsed.description.sdp) {
                        const sdp = parsed.description.sdp;
                        const match = sdp.match(/^s=([a-z0-9]+)\r\n/m);
                        if (match) {
                            parsed.description.sdp = sdp.replace(/^s=[a-z0-9]+\r\n/m, `s=e7f9a2\r\n`);
                            data = JSON.stringify(parsed);
                            OriginalWebSocketSend.call(this, data);
                        }
                    }
                } catch (e) {
                    OriginalWebSocketSend.call(this, arguments);
                    window.postMessage({ type: `CHROMEGLE_SDP_MOD_FAILED`, message: e.message }, '*');

                }
            } else {
                OriginalWebSocketSend.apply(this, arguments);
            }
        };
        return socket;
    };

    PatchedWebSocket.prototype = OriginalWebSocket.prototype;
    Object.defineProperty(window, 'WebSocket', { value: PatchedWebSocket, writable: true, configurable: true });
    window.postMessage({ type: 'CHROMEGLE_SOCKET_INTERCEPTED' }, '*');


})();