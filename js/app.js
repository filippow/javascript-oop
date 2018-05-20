export default class App {
    constructor({ canvas, control, colorPalette, colorPicker }) {
        this.canvas = canvas;
        this.control = control;
        this.colorPalette = colorPalette;
        this.colorPicker = colorPicker;
       
        this.context = null;
        this.isDrawing = false;

        this.init();
    }

    init() {
        this.context = this.canvas.getContext('2d');

        this.canvas.addEventListener('mousedown', this.handleCanvasMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));

        this.clearScreen = this.control.querySelector('#clear-canvas-button');
        this.clearScreen.addEventListener('click', this.handleCanvasClear.bind(this));

        this.brushWidth = this.control.querySelector('#brush-size-slider');
        this.brushWidth.addEventListener('change', this.handleBrushSizeChange.bind(this));

        this.newColorButton = this.control.querySelector('#new-color-button');
        this.newColorButton.addEventListener('click', this.onChoiceNewColor.bind(this));
       
        this.colorPicker.addNewColor = this.onAddNewColorForPalette.bind(this);
    }

    onAddNewColorForPalette(newColor) {
        this.colorPalette.setNewColor(newColor);
    }
    
    onChoiceNewColor() {
        this.colorPicker.showAndHideTools();
    }

    handleCanvasMousedown(event) {
        this.lastEvent = event;
        this.isDrawing = true;
    }

    handleCanvasMousemove(event) {
        if (this.isDrawing) {
            this.context.beginPath();
            this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.strokeStyle = this.colorPalette.currentColorAsString;
            this.context.stroke();
            this.lastEvent = event;
        }
    }

    handleCanvasMouseup(event) {
        this.isDrawing = false;
    }

    handleCanvasMouseleave(event) {
        this.isDrawing = false;
    }

    handleCanvasClear(event) {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleBrushSizeChange(event) {
        this.context.lineWidth = Number(event.target.value);
    }
}