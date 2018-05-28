import Grid from './grid.js';
import Game from './game.js';



let game = new Game({
    grid: new Grid({
        table: document.querySelectorAll('.row')
    }),
    controls: document.querySelector('.controls'),
    display: document.querySelector('.display')
})
 