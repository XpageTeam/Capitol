import domReady from "./xpage/ready";
import MobileMenu from "./xpage/mobileMenu";
import { EventListener } from "./xpage/index";

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
    })
});