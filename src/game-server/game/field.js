const {Cell} = require('./cell.js');
const {Ball,COLORS} = require('./ball.js');

class Field {
    constructor(width = 9, height = 9) {
        this.width = width;
        this.height = height;

        this.cells = [];
        this.freeCells = 0;

        for (let x = 0; x < width; x++) {
            this.cells[x] = [];
            for (let y = 0; y < height; y++) {
                this.cells[x][y] = new Cell(this, x, y);
                this.freeCells += 1;
            }
        }

        this.nextDrop = 0;
    }

    findWay(from, to) {
        let d = 0;
        let maps = [];
        let pathLength = [];
        for (let x = -1; x <= this.width; x++) {
            maps[x] = [];
            pathLength[x] = [];
            for (let y = -1; y <= this.height; y++) {
                pathLength[x][y] = -1;
                if (x === -1 || y === -1 || x === this.width || y === this.height) {
                    maps[x][y] = -1;
                } else if (this.cells[x][y].ball === null) {
                    maps[x][y] = 0;
                } else {
                    maps[x][y] = -1;
                }
            }
        }
        let stack = [from];
        pathLength[from.x][from.y]=0;
        while (stack.length > 0 && pathLength[to.x][to.y] === -1) {
            let newStack = [];
            for (let i = 0; i < stack.length; i++) {
                if (maps[stack[i].x + 1][stack[i].y] === 0 && pathLength[stack[i].x + 1][stack[i].y] === -1) {
                    pathLength[stack[i].x + 1][stack[i].y] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[stack[i].x + 1][stack[i].y]);
                }
                if (maps[stack[i].x - 1][stack[i].y] === 0 && pathLength[stack[i].x - 1][stack[i].y] === -1) {
                    pathLength[stack[i].x - 1][stack[i].y] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[stack[i].x - 1][stack[i].y]);
                }
                if (maps[stack[i].x][stack[i].y + 1] === 0 && pathLength[stack[i].x][stack[i].y + 1] === -1) {
                    pathLength[stack[i].x][stack[i].y + 1] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[stack[i].x][stack[i].y + 1]);
                }
                if (maps[stack[i].x][stack[i].y - 1] === 0 && pathLength[stack[i].x][stack[i].y - 1] === -1) {
                    pathLength[stack[i].x][stack[i].y - 1] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[stack[i].x][stack[i].y - 1]);
                }
            }
            stack = newStack;
        }
        let path = [];
        console.log(pathLength);
        if (pathLength[to.x][to.y] > 0) {
            let current = to;
            path.push(this.cells[current.x][current.y]);
            while (current.x !== from.x || current.y !== from.y) {
                if (pathLength[current.x][current.y] - 1 === pathLength[current.x + 1][current.y]) {
                    current = this.cells[current.x + 1][current.y];
                } else if (pathLength[current.x][current.y] - 1 === pathLength[current.x - 1][current.y]) {
                    current = this.cells[current.x - 1][current.y];
                } else if (pathLength[current.x][current.y] - 1 === pathLength[current.x][current.y + 1]) {
                    current = this.cells[current.x][current.y + 1];
                } else if (pathLength[current.x][current.y] - 1 === pathLength[current.x][current.y - 1]) {
                    current = this.cells[current.x][current.y - 1];
                }
                console.log('step',current.toPlain());
                path.unshift(current);
            }
        }
        return path;


    }

    getLines() {
        let useCells = [];
        let useColors = [COLORS.RAINBOW];

        for (let x = 0; x < this.width; x++) {
            let findCells = [];
            for (let y = 0; y < this.height; y++) {
                if (findCells.length > 0) {
                    this.checkCurrentLine(findCells, x, y, useCells, useColors);
                }
                if (this.cells[x][y].ball) {
                    findCells.push(this.cells[x][y]);
                }
            }
           Field.checkLines(findCells, useCells, useColors);
        }


        for (let y = 0; y < this.width; y++) {
            let findCells = [];
            for (let x = 0; x < this.height; x++) {
                if (findCells.length > 0) {
                    this.checkCurrentLine(findCells, x, y, useCells, useColors);
                }
                if (this.cells[x][y].ball) {
                    findCells.push(this.cells[x][y]);
                }
            }
           Field.checkLines(findCells, useCells, useColors);
        }


        for (let x = this.width - 1; x >= 0; x--) {
            let findCells = [];
            let y = 0;
            do {
                if (findCells.length > 0) {
                    this.checkCurrentLine(findCells, x + y, y, useCells, useColors);
                }
                if (this.cells[x+y][y].ball) {
                    findCells.push(this.cells[x + y][y]);
                }
                y++;
            } while (x + y < this.width);
           Field.checkLines(findCells, useCells, useColors);
        }
        for (let y = 1; y < this.width; y++) {
            let findCells = [];
            let x = 0;
            do {
                if (findCells.length > 0) {
                    this.checkCurrentLine(findCells, x, y + x, useCells, useColors);
                }
                if (this.cells[x][y+x].ball) {
                    findCells.push(this.cells[x][y + x]);
                }
                x++;
            } while (x + y < 5);
           Field.checkLines(findCells, useCells, useColors);
        }


        for (let y = this.height - 1; y >= 0; y--) {
            let findCells = [];
            let x = this.width - 1;
            let i = 0;
            do {
                if (findCells.length > 0) {
                    this.checkCurrentLine(findCells, x - i, y + i, useCells, useColors);
                }
                if (this.cells[x-i][y+i].ball) {
                    findCells.push(this.cells[x - i][y + i]);
                }
                i++;
            } while (y + i < this.height);
           Field.checkLines(findCells, useCells, useColors);
        }
        for (let x = this.width - 1; x >= 0; x--) {
            let findCells = [];
            let y = 0;
            let i = 0;
            do {
                if (findCells.length > 0) {
                    this.checkCurrentLine(findCells, x - i, y + i, useCells, useColors);
                }
                if (this.cells[x-i][y+i].ball) {
                    findCells.push(this.cells[x - i][y + i]);
                }
                i++;
            } while (x - i > 0);
           Field.checkLines(findCells, useCells, useColors);
        }

        let points =  Field.countPoints(useCells.length,useColors.length);

        return {
            points : points,
            cells: useCells,
        }
    }

    static countPoints(countCells, countColor){
        let points = 0;
        if (countCells>=5){
            let an = 2+(countCells-5-1);
            points = 5+((countCells-2))/2*(countCells-5)
        }
        return points*countColor-1;
    }

     checkCurrentLine(findCells, x, y, useCells, useColors) {
        if (this.cells[x][y].ball
            && this.cells[x][y].ball.isComporable(findCells[findCells.length - 1].ball.color)) {
        } else {
           Field.checkLines(findCells, useCells, useColors);
        }
    }

    static checkLines(findCells, useCells, useColors) {
        if (findCells.length > 5) {
            for (let i = 0; i < findCells.length; i++) {
                if (!useCells.includes(findCells[i])) {
                    useCells.push(findCells[i]);
                }
                if (!useColors.includes(findCells[i].ball.color)) {
                    useColors.push(findCells[i].ball.color);
                }
            }
        }
        findCells = [];
    }


    /**
     * Возвращает координаты клетки куда помещен "шар" из сброса
     *
     * @param ball
     * @param number
     *
     * @return {{x: number, y: number}}
     */
    placeDrop(ball, number) {
        let normalNumber = number % this.freeCells;
        let x = 0;
        let y = 0;

        for (x = 0; x < this.width && normalNumber; x++) {
            for (y = 0; y < this.height && normalNumber; y++) {
                if (!this.cells[x][y].ball) {
                    normalNumber -= 1;
                    if (normalNumber === 0) {
                        this.cells[x][y].ball = ball;
                        this.freeCells -= 1;
                        return {x, y};
                    }
                }
            }
        }


    }
}

module.exports = {
    Field
};
