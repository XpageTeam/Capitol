import domReady from "./xpage/ready";
import App from "./xpage/core";
import MobileMenu from "./xpage/mobileMenu";
import { EventListener } from "./xpage/index";

domReady(async () => {
    if (window.is.touchDevice())
        return;

    const select = await import("./xpage/select");

    App.each(".catalog-sort__select select", (el: HTMLSelectElement) => {
        new select.default(el);
    });
});


/**
 * Вставка кнопки для вызова 
 * блока с фильтрами
 * ! в адаптиве
 */
domReady(() => {
    const catSort = document.querySelector(".catalog-sort");

    if (!catSort) return;

    const filterBtn = document.createElement("button");

    filterBtn.classList.add("catalog-sort__filter-btn");


    const filterBlock = document.querySelector(".filter");

    if (!filterBlock) return;

    const closeFilterBtn = document.createElement("span");
    
    closeFilterBtn.classList.add("filter__close");

    filterBlock.prepend(closeFilterBtn);

    catSort.prepend(filterBtn);

    const filter = new MobileMenu({
        burger: ".catalog-sort__filter-btn",
        menu: ".inner-content__aside",
        menuActiveClass: "js__opened",
        bodyActiveClass: "js__menu-opened",
        ignoreWarnings: false,
        fixBody: true,
        media: "screen"
    });

    new EventListener(".filter__close").add("click", () => {
        filter.closeMenu();
    });
});