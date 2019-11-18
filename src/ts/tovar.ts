import domReady from "./xpage/ready";
import Swiper from "swiper";
import { settings, App } from "./xpage/index";

domReady(() => {
    ;(async function(){
        const tovarSlider = document.querySelector(".tovar__imgs") as HTMLElement;
    
        if (!tovarSlider) return;
    
        const {Swiper, Lazy, Navigation, Pagination, Keyboard} = await import("swiper/dist/js/swiper.esm");
    
        Swiper.use([Lazy, Navigation, Pagination, Keyboard]);
        
        const slider = new Swiper(tovarSlider, {
            // loop: true,
            slidesPerView: 3,
            lazy: {
                loadPrevNext: true
            }
        });
    
        if (window.matchMedia(settings.adaptiveMedia))
            loadingAllImgs(slider);
        
        window.addEventListener("resize", function(){
            if (window.matchMedia(settings.adaptiveMedia))
                loadingAllImgs(slider);
        });
    })();

    ;(async function(){
        const botSlider = document.querySelectorAll(".bot-slider");

        if (!botSlider.length)
            return;
        
        const {Swiper, Lazy, Navigation, Pagination, Keyboard} = await import("swiper/dist/js/swiper.esm");

        Swiper.use([Lazy, Navigation, Pagination, Keyboard]);

        App.each(".bot-slider", (slider: HTMLElement) => {
            new Swiper(slider, {
                slidesPerView: "auto",
                spaceBetween: 36,
                lazy: {
                    loadPrevNext: true
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                navigation: {
                    prevEl: slider.querySelector(".swiper-button-prev") as HTMLElement,
                    nextEl: slider.querySelector(".swiper-button-next") as HTMLElement
                }
            })
        });
    })();
});

const loadingAllImgs = (slider: Swiper) => {
    slider.lazy.load();
}