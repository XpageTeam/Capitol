import domReady from "./xpage/ready";
import {Swiper, Lazy, Navigation, Keyboard, EffectFade, Autoplay} from "swiper/dist/js/swiper.esm";
import App from "./xpage/core";

Swiper.use([Lazy, Navigation, EffectFade, Keyboard, Autoplay]);

domReady(() => {
    // App.each(".main-slide__content-text", (slideText: HTMLElement) => {
    //     const curTextArray = slideText.innerText.split("");

    //     slideText.innerText = "";

    //     for (let i = 0; i < curTextArray.length; i++)
    //         slideText.innerHTML+= `<span style="transition-delay: .${i+1}s">${curTextArray[i]}</span>`;
    // });

    new Swiper(".main-slider", {
        effect: "fade",
        loop: true,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true
        },
        keyboard: {
            enabled: true
        },
        navigation: {
            prevEl: ".main-nav .swiper-button-prev",
            nextEl: ".main-nav .swiper-button-next"
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 5000,
        }
    });
});