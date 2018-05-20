export default class colorPalette {

  constructor({element, colors}) {
    this._element = element;
    this._colors = colors;
    this._currentColor = colors[0];

    this.init(colors,element);
  }

  init(colors,element) {
    element.addEventListener('click', this.onHandleChangeColor.bind(this));
    this.initDefaultColors(colors);
  }

  initDefaultColors(colors) {
    colors.forEach( (color,index) => {
      let li = this.createElement(color);
      
      if (index == 0) {
        li.classList.add('selected');
      }
    
      this.element.appendChild(li);
    })
  }
  
  onHandleChangeColor(event) {
    if (event.target.classList.contains('color-palette__color')) {
      let activeElement = event.target,
          elements = Array.prototype.slice.call(this.element.children);

      this.setActiveColorElement(activeElement); 
      this.currentColor = this.colors[elements.indexOf(activeElement)]; 
    }  
  }

  setNewColor(color) {
    let li = this.createElement(color);

    this.element.appendChild(li);

    this._colors.push(color);
    this.currentColor = color;
  
    this.setActiveColorElement(li);
  }

  setActiveColorElement(activeElement) {
    let elements = Array.prototype.slice.call(this.element.children);

    elements.forEach( elem => {
      elem.classList.remove('selected');
    });

    activeElement.classList.add('selected');
  }

  createElement(color) {
    let li = document.createElement('li');

    li.style.background = `rgb(${color.red},${color.green},${color.blue})`;
    li.classList.add('color-palette__color');
    
    return li
  }

  get element() {
    return this._element;
  }

  get colors() {
    return this._colors;
  }

  get currentColor() {
    return this._currentColor;
  }

  set currentColor(color) {
    if (color) {
      this._currentColor = {
        red: color.red,
        green: color.green,
        blue: color.blue
      }
    }
  }
  
  get currentColorAsString() {
    return  `rgb(${this.currentColor.red},${this.currentColor.green},${this.currentColor.blue})`;
  }
};