import "./popup-menu"
import domReady from "./xpage/ready"

domReady(async () => {
    if (window.is.touchDevice())
        return;

    const select = await import("./xpage/select");

    new select.default(".h-city select");
});