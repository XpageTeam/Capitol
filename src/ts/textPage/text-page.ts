import {domReady, EventListener, App} from "../xpage/index"

interface Shadows {
	right: HTMLElement,
	left?: HTMLElement
}

domReady(() => {
	const tables = App.elementsGetter(".standart-page table:not([class])");

	for (let table of tables){
		const tableWrap: HTMLElement = document.createElement("div"),
			tableWrapTrack: HTMLElement = document.createElement("div"),
			shadows: Shadows = {
				right: document.createElement("div"),
				left: document.createElement("div"),
			};

		shadows.right.classList.add("table-wrap__shadow")
		shadows.right.classList.add("table-wrap__shadow--right")	

		shadows.left.classList.add("table-wrap__shadow")
		shadows.left.classList.add("table-wrap__shadow--left")

		tableWrap.classList.add("table-wrap");
		tableWrapTrack.classList.add("table-wrap__track");

		App.wrap(table, tableWrapTrack);
		App.wrap(tableWrapTrack, tableWrap);

		tableWrap.insertBefore(shadows.left, tableWrap.querySelector("*:first-child"));
		tableWrap.insertBefore(shadows.right, null);

		;(function(track: HTMLElement){
			if (track.scrollWidth > track.clientWidth){
				let wrap = track.closest(".table-wrap");

				let shadows: Shadows = {
					right: wrap.querySelector(".table-wrap__shadow--right")
				};

				setShadowOpacity(shadows.right, track.scrollWidth - track.clientWidth)
			}

			new EventListener(track).add("scroll", function(el: HTMLElement){
				const wrap = el.closest(".table-wrap");

				let shadows: Shadows = {
					left: wrap.querySelector(".table-wrap__shadow--left"),
					right: wrap.querySelector(".table-wrap__shadow--right")
				};

				setShadowOpacity(shadows.right, el.scrollWidth - el.clientWidth - el.scrollLeft)
				setShadowOpacity(shadows.left, el.scrollLeft)
			});
		})(tableWrapTrack);
	}
})

const setShadowOpacity = (element:HTMLElement, scrollWidth: number, offsetWidth: number = 80) => {
	element.style.opacity = (scrollWidth / offsetWidth <= 1 ? scrollWidth / offsetWidth : 1).toString()
}