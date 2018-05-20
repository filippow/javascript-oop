export default class ColorPicker {
  constructor({element, addNewColor = () => {} }) {
    this._element = element;
    this.addNewColor = addNewColor;
    this._newColor = {
      red: 0,
      green: 0,
      blue: 0
    };

    this.init(element);
  }

  init(element) {
    this._preview = element.querySelector('.color-picker__preview');
    this.colorSliders = element.querySelector('.color-picker__sliders');
    
    this.colorSliders.addEventListener('change', this.onChangeSlidersValue.bind(this));

    this.addButton = element.querySelector('.color-picker__add-button');
    this.addButton.addEventListener('click', this.onAddNewColor.bind(this));

    this.closeButton = element.querySelector('.color-picker__close-button');
    this.closeButton.addEventListener('click', this.showAndHideTools.bind(this));

    this.drawPreview();
  }

  onChangeSlidersValue(event) {
    let {red, green, blue} = this.newColor;
    
    switch(event.target.id) {
      case 'red': 
          red= event.target.value;
          break;
      case 'green':
          green = event.target.value;
          break;
      case 'blue':
          blue = event.target.value;
          break;
      default:
          console.log('Что-то не подходит');
    }
    this.newColor = {red, green, blue};
    this.drawPreview();
  }

  onAddNewColor() {
    this.addNewColor(this.newColor);
    this.showAndHideTools();
  }

  showAndHideTools() {
    this._element.classList.toggle('open');
  }

  drawPreview() {
    this._preview.style.background = `rgb(${this.newColor.red},${this.newColor.green},${this.newColor.blue})`
  }

  get newColor() {
    return this._newColor;
  }

  set newColor({red, green, blue}) {
    this._newColor = {
      red: red,
      green: green,
      blue: blue
    };
  }
}