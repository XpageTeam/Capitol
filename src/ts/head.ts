import "./popup-menu"
import domReady from "./xpage/ready"

domReady(() => {
    if (window.is.touchDevice())
        return;

    import("./xpage/select").then(function(select){
        new select.default(".h-city select");
    }); 
});