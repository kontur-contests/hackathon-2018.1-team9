const Cell = require('./cell.js');

class Field {
    constructor (width = 9, height = 9) {
        this.width = width;
        this.height = height;

        this.cells = [];
        this.freeCells = 0;

        for (let x = 0; x < 9; x++) {
            this.cells[x] = [];
            for (let y = 0; y < 9; y++) {
                this.cells[x][y] = new Cell(this, x, y);
                this.freeCells += 1;
            }
        }

        this.nextDrop = 0;
    }

    findWay(from, to) {

    }

    getLines() {

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
                }
            }
        }

        this.cells[x][y].ball = ball;

        return {x, y};
    }
}

modules.exports = {
    Field
};
