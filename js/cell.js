export default class Cell {
  constructor({cell}) {
      this.element= cell;
      this._alive = false;

      this.init(cell);
  }

  init(cell) {
      cell.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick(event) {
      this.element.classList.toggle('alive');
      this.alive = !this.alive;
  }

  get alive() {
      return this._alive;
  }

  set alive(val) {
      this._alive = val;
      this.element.classList.toggle('alive', val);
  }

  
}