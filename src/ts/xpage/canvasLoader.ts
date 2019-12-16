class loaderCanvas {
    private _curPercent: number = 0;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _radius: number;
    private _lineWidth: number = 1;

    set curPercent(value: number){
        this._curPercent = value;

        this.moveLine(value);
    }

    constructor(private _canvas: HTMLCanvasElement){
        this.setSizes();

        this._context = this._canvas.getContext("2d");
    }

    private setSizes(){
        const parent = this._canvas.closest("div").getBoundingClientRect();

        this._width = parent.width;
        this._height = parent.height;
        this._radius = this._width / 2 - Math.ceil(this._lineWidth);

        this._canvas.setAttribute("width", this._width.toString());
        this._canvas.setAttribute("height", this._height.toString());
    }

    private getAngleByPercents(persent: number): number{
        return Math.PI * 2 * (persent / 100) + Math.PI / 2;
    }

    private moveLine(targetPercents: number){
        const ctx = this._context;

        ctx.clearRect(0, 0, this._width, this._height);

        ctx.beginPath();

        ctx.arc(
            this._width / 2, 
            this._width / 2, 
            this._radius,
            Math.PI / 2,
            this.getAngleByPercents(targetPercents)
        );
        

        ctx.lineWidth = this._lineWidth;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}

export default loaderCanvas;