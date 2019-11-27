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
            slidesPerView: 2,
            spaceBetween:  30,
            lazy: {
                loadPrevNext: true
            },
            pagination: {
                el: ".tovar__imgs-pagination .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                900: {
                    slidesPerView: 1
                }
            }
        });
    
        if (window.matchMedia("(max-width: 1200px"))
            loadingAllImgs(slider);
        
        window.addEventListener("resize", function(){
            if (window.matchMedia("(max-width: 1200px"))
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
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 2
                    },
                    1000: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    660: {
                        slidesPerView: 1
                    }
                }
            })
        });
    })();
});

const loadingAllImgs = (slider: Swiper) => {
    slider.lazy.load();
}