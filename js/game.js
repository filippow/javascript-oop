
export default class Game {
  constructor({grid,controls,display}) {
      this.grid = grid;
      
      this.init(controls);

      this.grid.changeTotalCount = count => this.onChangeTotalCount(count);
      this.grid.changeGenerationCount = generation => this.onchangeGenerationCount(generation);
  
  }

  init(controls) {
      this.speed = document.querySelector('#speed-slider').max;
      this.displayTotalCount = document.querySelector('.totalCount');
      this.generationCount = document.querySelector('.generation');
      
      controls.querySelector('#play-button').addEventListener('click', this.play.bind(this));
      controls.querySelector('#reset-button').addEventListener('click', this.reset.bind(this));
      controls.querySelector('#randomize-button').addEventListener('click', this.randomize.bind(this));
      controls.querySelector('#speed-slider').addEventListener('change', this.changeSpeed.bind(this));
  }

  onChangeTotalCount(count) {
    this.displayTotalCount.textContent = count;
  }

  onchangeGenerationCount(generation) {
    this.generationCount.textContent = generation;
  }

  changeSpeed({target}) {
      this.speed = target.max - target.value;
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
}