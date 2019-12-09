import domReady from "./xpage/ready";
import { EventListener, App } from "./xpage/index";

domReady(() => {
    let isAnimatingNow = false;

    new EventListener(".ot-more").add("click", (el: HTMLElement, event: Event) => {
        event.preventDefault();

        // if (isAnimatingNow) return;

        isAnimatingNow = true;

        const curOrderItem = el.closest(".orders-list__item"),
            targetContent = curOrderItem.querySelector(".orders-list__item-content") as HTMLElement;

        targetContent.style.overflow = "hidden";

        if (!curOrderItem.classList.contains("js__opened")){

            App.each(".orders-list__item", (el: HTMLElement) => {
                const curOrderItem = el.closest(".orders-list__item"),
                    targetContent = curOrderItem.querySelector(".orders-list__item-content") as HTMLElement;

                targetContent.style.height = `${targetContent.scrollHeight}px`;
                getComputedStyle(targetContent, null).getPropertyValue("height");

                curOrderItem.classList.remove("js__opened");

                targetContent.style.height = "0";

                new EventListener(targetContent).add("transitionend", (el: HTMLElement) => {
                    if (el.style.height !== "0px")
                        el.style.height = "auto";
                    else
                        el.style.display = "none";
        
                    isAnimatingNow = false;
                }, {
                    once: true
                });
            });




            curOrderItem.classList.add("js__opened");

            targetContent.style.height = "0px";

            targetContent.style.display = "block";

            targetContent.style.height = `${targetContent.scrollHeight}px`;
        }else{
            targetContent.style.height = `${targetContent.scrollHeight}px`;
            getComputedStyle(targetContent, null).getPropertyValue("height");

            curOrderItem.classList.remove("js__opened");

            targetContent.style.height = "0";
        }

        new EventListener(targetContent).add("transitionend", (el: HTMLElement) => {
            if (el.style.height !== "0px")
                el.style.height = "auto";
            else
                el.style.display = "none";

            isAnimatingNow = false;
        }, {
            once: true
        });
    });
});