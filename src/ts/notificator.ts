import { EventListener, domReady } from "./xpage/index";

class Notificator{
    private _text: string = "";
    private _type: string = "";
    private _time: number = 3000;
    private _el = document.querySelector(".notificator");

    set text(text: string){
        this._text = text;

        this._el.querySelector(".notificator__text").innerHTML = text;
    }

    set type(type: string){
        this._type = type

        this._el.setAttribute("class", "notificator");
        this._el.classList.add(type);
    }

    public showMessage(text: string, time: number = 3000, type: string = "notification"){
        if (!this._el)
            throw new Error("нет блока для отображения сообщений");

        this.text = text;
        this.type = type;
        this._time = time;

        this.show();
    }

    private show(){
        this._el.classList.add("js__show");
        this.bindEvents();
    }

    private hide(){
        this._el.classList.remove("js__show");
    }

    private bindEvents(){
        new EventListener(this._el).add("transitionend", (notifElement: HTMLElement) => {
            setTimeout(() => {
                this.hide();
            }, this._time);
        }, {
            once: true
        });
    }
}

domReady(() => {
    window.notificator = new Notificator();
});