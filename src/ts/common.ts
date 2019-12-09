// import "./forms"
import "./textPage/text-page";

import "./head"
import "./notificator"

import "./catalog-sort"
import "./tovar"
import "./tabs"
import "./lc-orders"

import "./timeline-slider"
import App from "./xpage/core";
import domReady from "./xpage/ready";
import { EventListener, sameHeights } from "./xpage/index";

import "./forms";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
		notificator: any
	}
}

domReady(async () => {
    if (window.is.touchDevice())
		return;

    const select = await import("./xpage/select");

    App.each(".default-input__input--select", (el: HTMLSelectElement) => {
		new select.default(el);
    });
});

domReady(() => {
	new EventListener(".lc-links select").add("change", (select: HTMLSelectElement) => {
		const id = +select.value;

		(document.querySelector(`.lc-links__link:nth-child(${id + 1}) a`) as HTMLLinkElement).click();
	});
});

domReady(() => {
	sameHeights(".catalog2-list", ".cat-item__desc-title")
});