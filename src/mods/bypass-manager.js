class BypassManager extends Module {

  static mobileSupported = true;

  constructor() {
    super();
    Logger.INFO("BypassManager Loaded");
    this.listenForBridgeEvents();
  }

  listenForBridgeEvents() {
    window.addEventListener("message", (event) => {
      if (event.data.type === "CHROMEGLE_SOCKET_INTERCEPTED") {
        Logger.INFO("Webscoket intercepted.");
      } else if (event.data.type === "CHROMEGLE_WORKER_INTERCEPTED") {
        Logger.INFO("Face detection worker intercepted");
      } else if (event.data.type === "CHROMEGLE_BYPASS_FAILED") {
        Logger.ERROR("Error bypassing detection.");
        alert("CHROMEGLE:Unable to bypass detection. You may be at risk of being banned. Please refresh the page to try again, if the problem persists, stop using the extension immediately.");
      } else if (event.data.type === "CHROMEGLE_REPORT_DETECTED") {
        Logger.WARNING("Report detected!");
        this.showReportNotification();
      }
    });
  }

  showReportNotification() {
    const existingNotification = document.getElementById("chromegle-report-notification");

    if (existingNotification) {
      existingNotification.remove();
    }

    const notificationDiv = document.createElement("div");
    notificationDiv.id = "chromegle-report-notification";
    notificationDiv.style.position = "absolute";
    notificationDiv.style.top = "75px";
    notificationDiv.style.left = "10px";
    notificationDiv.style.zIndex = "99999";
    notificationDiv.style.backgroundColor = "rgba(255, 0, 0, 0.85)";
    notificationDiv.style.color = "white";
    notificationDiv.style.padding = "15px";
    notificationDiv.style.borderRadius = "8px";
    notificationDiv.style.border = "1px solid darkred";
    notificationDiv.style.fontSize = "16px";
    notificationDiv.style.fontWeight = "bold";
    notificationDiv.style.textAlign = "center";
    notificationDiv.style.maxWidth = "calc(50% - 20px)";
    notificationDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
    notificationDiv.style.pointerEvents = "none";

    let message = "Someone reported you.";

    notificationDiv.textContent = message;

    document.body.appendChild(notificationDiv);

    setTimeout(() => {
      if (notificationDiv) {
        notificationDiv.remove();
      }
    }, 10000);
  }
}
