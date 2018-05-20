export default class ColorPicker {
  constructor({element, addNewColor = () => {} }) {
    this._element = element;
    this.addNewColor = addNewColor;
    this._newColor = {red: 0, green: 0, blue: 0 };

    this.init(element);
  }

  init(element) {
    this.preview = element.querySelector('.color-picker__preview');

    element.querySelector('.color-picker__sliders')
      .addEventListener('change', this.onChangeSlidersValue.bind(this));

    element.querySelector('.color-picker__add-button')
      .addEventListener('click', this.onAddNewColor.bind(this));

    element.querySelector('.color-picker__close-button')
      .addEventListener('click', this.showAndHideTools.bind(this));

    this.drawPreview();
  }

  //  Пытался переписать этот метод так же как в ветке solution, но в этом случае появляется БАГА!
  //  При добавлении нескольких новых цветов, на экране они отображатся правильно, но по сути 
  //  все добавленные имеют одно и тоже value. Как бы новый цвет перезаписывает все остальные добавленные.
  //  Хз почему так. Поэтому оставил как было.

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
    this.preview.style.background = `rgb(${this.newColor.red},${this.newColor.green},${this.newColor.blue})`
  }

  get newColor() {
    return this._newColor;
  }

  set newColor({red, green, blue}) {
    this._newColor = {
      red: red,
      green: green,
      blue: blue
    }
  }
}