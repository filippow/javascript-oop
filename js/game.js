
export default class Game {
  constructor({grid,controls,display}) {
      this.grid = grid;
      this._speed = 0;
      this.display = display.querySelector('.totalCount');
    
      
      this.init(controls);
      console.log(this.grid.totalCount);

      this.grid.changeTotalCount = count => this.onChangeTotalCount(count);
  }

  init(controls) {
      controls.querySelector('#play-button').addEventListener('click', this.play.bind(this));
      controls.querySelector('#reset-button').addEventListener('click', this.reset.bind(this));
      controls.querySelector('#randomize-button').addEventListener('click', this.randomize.bind(this));
      controls.querySelector('#speed-slider').addEventListener('change', this.changeSpeed.bind(this));
      this.display.style.color = 'white';
     
  }

  onChangeTotalCount(count) {
    this.display.textContent = count;

  }

  changeSpeed(event) {
      this.speed = event.target.value;
      this.play();
  }

  play() {
      this.grid.play(this.speed);
  }

  reset() {
      this.grid.reset();
  }
  
  randomize() {
      this.grid.randomize();
  }

  get speed() {
      return this._speed;
  }
  
  set speed(value) {
      this._speed = value;
  }
}