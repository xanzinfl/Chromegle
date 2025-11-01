document.addEventListener('scrapeAddress', () => {

    window.oRTCPeerConnection = (window.oRTCPeerConnection || window.RTCPeerConnection);

    // Override the RTC peer connection creation to scrape our data
    window.RTCPeerConnection = function (...args) {

        // Only log the IP once
        let logged = false;

        const conn = new window.oRTCPeerConnection(...args)
        conn.oaddIceCandidate = conn.addIceCandidate;

        // Override adding ice candidates to scrape our data
        conn.addIceCandidate = async function (iceCandidate, ...rest) {
            let fields = iceCandidate.candidate.split(' ');
            const candidateType = fields[7];
            const candidateIp = fields[4];

            if (!logged && (candidateType === 'srflx' || candidateType === 'relay')) {
                logged = true;

                window.dispatchEvent(new CustomEvent("displayScrapeData", {
                    detail: {
                        ip: candidateIp,
                        type: candidateType
                    }
                }));
            }

            return conn.oaddIceCandidate(iceCandidate, ...rest);
        }

        // Return the connection
        return conn;

    }

});