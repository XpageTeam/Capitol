import $ from "jquery"
import is from "is_js"
import {TweenLite} from "gsap/gsap-core.js";

import "./filter.js"
import { Sticky } from "./x-widgets.js"

window.jQuery = $
window.$ = $
window.is = is
window.TweenLite = TweenLite;


let isFancyboxReady = false;

import("./jquery.fancybox.js")
	.then(() => {
		const event = document.createEvent("HTMLEvents");

		event.initEvent("fancyboxReady", false, true)

		document.dispatchEvent(event);
		isFancyboxReady = true

	})

window.fancyboxReady = callback => {
	if (isFancyboxReady)
		callback()
	else
		document.addEventListener("fancyboxReady", callback)
}

document.addEventListener("DOMContentLoaded", () => {
    fancyboxReady(initFancybox);
});

document.addEventListener("DOMContentLoaded", () => {
	const stickyElements = document.querySelectorAll("[data-widget=\"sticky\"]:not(.filter)");

	if (!stickyElements.length)
		return;

	for (let i = 0; i < stickyElements.length; i++)
		Sticky(stickyElements[i])
});

document.addEventListener("DOMContentLoaded", () => {
	const phoneInputs = document.querySelectorAll(".phone-input, .input--phone");

	if (!phoneInputs.length)
		return;

	;(async function(){
		const IMask = await import("imask");

		phoneInputsMask(phoneInputs, IMask);

		const config = {
			childList: true,
			subtree: true
		};

		// Функция обратного вызова при срабатывании мутации
		const callback = function(mutationsList, observer) {
			for (let mutation of mutationsList) {
				if (mutation.addedNodes.length)
					for (const node of mutation.addedNodes)
						if (node instanceof HTMLElement)
							phoneInputsMask(node.querySelectorAll(".phone-input, .input--phone"), IMask);
			}
		}

		// Создаем экземпляр наблюдателя с указанной функцией обратного вызова
		const observer = new MutationObserver(callback);

		// Начинаем наблюдение за настроенными изменениями целевого элемента
		observer.observe(document.body, config);
		
	})();
});

const phoneInputsMask = (inputs, IMask) => {
	for (let i = 0; i < inputs.length; i++){
		const phoneInput = inputs[i];

		new IMask.default(phoneInput, {
			mask: '+# (000) 000-00-00',
			lazy: true,
			placeholder: {
				show: 'always'
			},
			definitions: {
				"#": "7",
			}
		});
	}
};

const initFancybox = () => {
	$(".fancybox").fancybox({
		trapFocus: false,
		touch : false,
		loop: true,
		buttons: ["fullscreen", "slideShow", "close", "thumbs"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});
};