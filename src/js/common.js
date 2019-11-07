import {TweenLite} from "gsap/TweenLite.js";
import $ from "jquery"
import is from "is_js"

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
    fancyboxReady(initFancybox)
});

document.addEventListener("DOMContentLoaded", () => {
	const phoneInputs = document.querySelectorAll(".phone-input");

	if (!phoneInputs.length)
		return;

	;(async function(){
		const IMask = await import("imask");

		for (let i = 0; i < phoneInputs.length; i++){
			const phoneInput = phoneInputs[i];

			new IMask.default(phoneInput, {
				mask: '+{7}(000)000-00-00'
			});
		}
		
	})()
});

const initFancybox = () => {
	$(".fancybox").fancybox({
		trapFocus: false,
		touch : {
  			vertical : false,
  		},
		loop: true,
		buttons: ["fullscreen", "slideShow", "close", "thumbs"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});
}

document.addEventListener("DOMContentLoaded", () => {
	if (is.touchDevice() || document.body.classList.contains("inner"))
		return

	;(function(){
		import("./jquery.menu-aim.js")
			.then(function(){
				$(".menu").menuAim({
					// submenuSelector: ".main-nav__submenu",
					activate: mainMenu.open,
					deactivate: mainMenu.close,
					submenuDirection: "right",
					exitMenu: mainMenu.close,
				})
			})
	})();
})

class mainMenu{
    static open(menuElement){
        menuElement.classList.add("js__submenu-visible")
    }

    static close(){
        $(".menu__item.menu__item--submenu").each(function(){
            this.classList.remove("js__submenu-visible")
        })
    }
}