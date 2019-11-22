import domReady from "./xpage/ready";
import App from "./xpage/core";

domReady(async () => {
    if (window.is.touchDevice())
        return;

    const select = await import("./xpage/select");

    App.each(".catalog-sort__select select", (el: HTMLSelectElement) => {
        new select.default(el);
    });
});