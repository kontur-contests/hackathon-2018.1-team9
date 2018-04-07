const Cell = require('./cell.js');


class Field {
    constructor (width = 9, height = 9) {
        this.width = width;
        this.height = height;

        this.cells = [];

        for (let x = 0; x < 9; x++) {
            this.cells[x] = [];
            for (let y = 0; y < 9; y++) {
                this.cells[x][y] = new Cell(this, x, y);
            }
        }
    }

    findWay(from, to) {

    }
}
