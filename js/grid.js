import Cell from './cell.js';
export default class Grid {
    constructor(table, changeTotalCount = () => {}, changeGenerationCount = () => {} ) {
        this.grid = [];
        this.changeTotalCount = changeTotalCount;
        this.changeGenerationCount = changeGenerationCount;
        this.nextGeneration = [];
        this.generationCount = 1;
        this.init(table.table);   
    }

    init(table) {
      for (let i=0; i<table.length; i++) {
        let temp = [];
        for (let j=0; j<table[i].children.length; j++) {
            temp.push(new Cell ({
              cell: table[i].children[j]
            }))
        }

        this.grid.push(temp);
      } 
    }

    play(speed) {
        if(this.id) {
            clearInterval(this.id);
        }
       this.id = setInterval(this.next.bind(this),speed);
    }

    next() {
      let newGeneration = [];
        
      for (let i=0; i<this.grid.length; i++) {
        for (let j=0; j<this.grid[i].length; j++) {
          if (this.grid[i][j].alive && this.getAliveCount(i,j)<2) {
              newGeneration.push({y:i,x:j, alive:false})
          } else if (this.grid[i][j].alive &&  this.getAliveCount(i,j)>3) {
              newGeneration.push({y:i,x:j,alive:false})
          } else if (this.grid[i][j].alive == false && this.getAliveCount(i,j)==3) {
              newGeneration.push({y:i,x:j,alive:true})
          }
        }
      }

      newGeneration.forEach(({x,y,alive}) => {
        this.grid[y][x].alive = alive;
      })

      this.changeTotalCount(this.totalCount);
      this.nextGenerationCount();
    }

    nextGenerationCount() {
      this.generationCount++;
      this.changeGenerationCount(this.generationCount);
    }

    randomize() {
        this.grid.forEach( row => {
            row.forEach( cell => {
                cell.alive = (Math.random()<0.5 ? false : true)
            })
        })

      this.changeTotalCount(this.totalCount);
    }

    reset() {
      this.grid.forEach( row => {
        row.forEach( cell => {
          cell.alive = false;
        })
      })

      clearInterval(this.id);
    }

    get totalCount() {
      let count = 0;
      this.grid.forEach( row => {
        row.forEach( cell => {
          if (cell.alive) {
            count++;
          }
        })
      })
       
      return count;
    }

    getAliveCount(y,x) {
      let count = 0;
      let cells = this.getRoundCells(y,x);

      cells.forEach( ([y,x]) => {
        if (this.grid[y][x].alive) {      
          count++;
        }
      })

      return count;
    }

    getRoundCells(y,x) {
        let maxX = this.grid[y].length-1;
        let maxY = this.grid.length-1;
        let arr = [];

        for (let i=y-1; i< y+2; i++) {
            for (let j=x-1; j<x+2; j++) {
                if ( !(i ==y && j == x)) {
                    arr.push([i,j]);
                }
            }
        }

        arr = arr.map( ([y,x]) => {
            if (y==-1)  {
                y=maxY;
            }
            if (x == -1) {
                x = maxX
            }
            if (x == maxX+1) {
                x = 0;
            }
            if (y == maxY+1) {
                y =0;
            }
            return [y,x]
        })

        return arr
    }

    

    
    


}