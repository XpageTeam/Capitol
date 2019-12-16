var loaderCanvas = (function () {
    function loaderCanvas(_canvas) {
        this._canvas = _canvas;
        this._curPercent = 0;
        this._lineWidth = 1;
        this.setSizes();
        this._context = this._canvas.getContext("2d");
    }
    Object.defineProperty(loaderCanvas.prototype, "curPercent", {
        set: function (value) {
            this._curPercent = value;
            this.moveLine(value);
        },
        enumerable: true,
        configurable: true
    });
    loaderCanvas.prototype.setSizes = function () {
        var parent = this._canvas.closest("div").getBoundingClientRect();
        this._width = parent.width;
        this._height = parent.height;
        this._radius = this._width / 2 - Math.ceil(this._lineWidth);
        this._canvas.setAttribute("width", this._width.toString());
        this._canvas.setAttribute("height", this._height.toString());
    };
    loaderCanvas.prototype.getAngleByPercents = function (persent) {
        return Math.PI * 2 * (persent / 100) + Math.PI / 2;
    };
    loaderCanvas.prototype.moveLine = function (targetPercents) {
        var ctx = this._context;
        ctx.clearRect(0, 0, this._width, this._height);
        ctx.beginPath();
        ctx.arc(this._width / 2, this._width / 2, this._radius, Math.PI / 2, this.getAngleByPercents(targetPercents));
        ctx.lineWidth = this._lineWidth;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    };
    return loaderCanvas;
})();
