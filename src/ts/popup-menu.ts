import domReady from "./xpage/ready";
import MobileMenu from "./xpage/mobileMenu";
import { EventListener, App } from "./xpage/index";

domReady(() => {
    const popupMenu = new MobileMenu({
        burger: ".burger",
        menu: ".popup-menu",
        menuActiveClass: "js__opened",
        bodyActiveClass: "js__menu-opened",
        ignoreWarnings: false,
        fixBody: true,
        media: "screen"
    });

    new EventListener(".popup-menu__close").add("click", function(){
        popupMenu.closeMenu()
    });

    App.each(".pm__item--submenu", (el: HTMLElement) => {
        const link = el.querySelector("a.pm__link") as HTMLElement,
            submenu = el.querySelector(".pm-submenu") as HTMLElement;
        

        if (!link || !submenu)
            return;
        
        const submenuBack = submenu.querySelector(".pm-submenu__back + li") as HTMLLIElement;        

        if (!submenuBack)
            return;

        link.addEventListener("click", function(e: Event){
            e.preventDefault();

            submenu.classList.add("js__opened");

            submenu.querySelector(".pm-submenu__back").addEventListener("click", function(){
                submenu.classList.remove("js__opened")
            });
        });

        const li = document.createElement("li"),
            a = document.createElement("a");

        a.classList.add("pm-submenu__link");

        a.innerText = link.innerText;
        
        li.appendChild(a);

        submenu.insertBefore(li, submenuBack);
    });
});