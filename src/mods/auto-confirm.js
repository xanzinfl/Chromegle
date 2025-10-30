class ConfirmManager extends Module {

    constructor() {
        super();

        this.addMultiElementListener(
            "click", this.onButtonClick,
            ".videoButton"
        );
    }

    onButtonClick(event) {
        event.preventDefault();

        const target = event.currentTarget;
        const href = target.getAttribute("href");

        if (href) {
            window.location.href = href;
        }
    }
}
