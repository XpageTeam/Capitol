import domReady from "./xpage/ready";

domReady(async () => {
    const botSlider = document.querySelector(".timeline-slider") as HTMLElement;

    if (!botSlider)
        return;
    
    const {Swiper, Navigation, Pagination, Keyboard} = await import("swiper/dist/js/swiper.esm");

    Swiper.use([Navigation, Pagination, Keyboard]);

    new Swiper(botSlider, {
        slidesPerView: 3,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            prevEl: botSlider.querySelector(".swiper-button-prev") as HTMLElement,
            nextEl: botSlider.querySelector(".swiper-button-next") as HTMLElement
        }
    });
});