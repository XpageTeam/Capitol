// import "./forms"
import "./textPage/text-page";

import "./xpage/loader";

import { domReady, App, EventListener } from "./xpage/index";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
	}
}

domReady(() => {
	if (
		window.is.desktop() &&
		document.querySelector(".default-input__input--select")
	)
		(async function() {
			const select = await import("./xpage/select");

			const selects = App.transformNodeListToArray(
				App.getElements(".default-input__input--select")
			);

			for (const sel of selects) new select.default(sel as HTMLSelectElement);
		})();

	;(async function() {
        const mobileMenu = await import("./xpage/mobileMenu");
        
        const menu = new mobileMenu.default({
            burger: ".head__burger",
            menu: ".head__menu",
            menuActiveClass: "js__opened",
            bodyActiveClass: "js__menu-opened",
            ignoreWarnings: true,
            fixBody: window.is.touchDevice(),
            media: "screen"
        })

        new EventListener(".menu__close").add("click", function(){
            menu.closeMenu()
        })
	})();
	
	if (window.is.touchDevice())
		menuForTouchDevice()
});

const menuForTouchDevice = () => {
	const menuActiveClass = "js__submenu-visible",
		menuElementClass = ".menu__item--submenu";

	App.each(menuElementClass, (el: HTMLElement) => {
		const link = el.querySelector(".menu__link") as HTMLLinkElement,
			submenu = el.querySelector(".submenu");

		if (!link || !submenu)
			return

		const newSubmenuElement = document.createElement("li"),
			newLink = document.createElement("a"),
			submenuBackElement = document.createElement("li");

		submenuBackElement.classList.add("submenu__back");

		submenuBackElement.innerText = `Назад`;

		newLink.classList.add("submenu__link");

		newLink.setAttribute("href", link.getAttribute("href"));

		newLink.innerText = link.innerText;

		newSubmenuElement.prepend(newLink);

		submenu.prepend(newSubmenuElement);
		submenu.prepend(submenuBackElement);


	});

	new EventListener(`${menuElementClass} .menu__link`).add("click", (el: HTMLLinkElement, event: Event) => {
		event.preventDefault();

		const parent = el.closest(menuElementClass);

		if (parent.classList.contains(menuActiveClass))
			parent.classList.remove(menuActiveClass);
		else{
			App.each(menuElementClass, (el: HTMLLIElement) => {
				el.classList.remove(menuActiveClass);
			});

			parent.classList.add(menuActiveClass);
		}
	});

	new EventListener(".submenu__back").add("click", (el: HTMLElement) => {
		const parent = el.closest(menuElementClass);

		parent.classList.remove(menuActiveClass)
	})
};