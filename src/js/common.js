import $ from "jquery"
import is from "is_js"

import "./filter.js"

window.jQuery = $
window.$ = $
window.is = is

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
    fancyboxReady(initFancybox)
});

// document.addEventListener("DOMContentLoaded", () => {
// 	const phoneInputs = document.querySelectorAll(".phone-input");

// 	if (!phoneInputs.length)
// 		return;

// 	;(async function(){
// 		const IMask = await import("imask");

// 		for (let i = 0; i < phoneInputs.length; i++){
// 			const phoneInput = phoneInputs[i];

// 			new IMask.default(phoneInput, {
// 				mask: '+{7}(000)000-00-00'
// 			});
// 		}
		
// 	})()
// });

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