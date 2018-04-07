const Cell = require('./cell.js');


class Field {
    constructor(width = 9, height = 9) {
        this.width = width;
        this.height = height;

        this.cells = [];

        for (let x = 0; x < width; x++) {
            this.cells[x] = [];
            for (let y = 0; y < height; y++) {
                this.cells[x][y] = new Cell(this, x, y);
            }
        }
    }

    findWay(from, to) {
        let d = 0;
        let maps = [];
        let pathLength = [];
        for (let x = -1; x <= this.width; x++) {
            maps[x] = [];
            pathLength[x] = [];
            for (let y = -1; y <= this.width; y++) {
                pathLength[x][y] = 0;
                if (x === -1 || y === -1 || x === this.width || y === this.width) {
                    maps[x][y] = -1;
                } else if (this.cells[x][y].ball === null) {
                    maps[x][y] = 0;
                } else {
                    maps[x][y] = -1;
                }
            }
        }
        let stack = [from];
        while (stack.length > 0 && pathLength[to.x][to.y] === 0) {
            let newStack = [];
            for (let i = 0; i < stack.length; i++) {
                if (maps[stack[i].x + 1][stack[i].y] === 0 && pathLength[stack[i].x + 1][stack[i].y] === 0) {
                    pathLength[stack[i].x + 1][stack[i].y] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[x + 1][y]);
                }
                if (maps[stack[i].x - 1][stack[i].y] === 0 && pathLength[stack[i].x - 1][stack[i].y] === 0) {
                    pathLength[stack[i].x - 1][stack[i].y] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[x - 1][y]);
                }
                if (maps[stack[i].x][stack[i].y + 1] === 0 && pathLength[stack[i].x][stack[i].y + 1] === 0) {
                    pathLength[stack[i].x][stack[i].y + 1] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[x][y + 1]);
                }
                if (maps[stack[i].x][stack[i].y - 1] === 0 && pathLength[stack[i].x][stack[i].y - 1] === 0) {
                    pathLength[stack[i].x][stack[i].y - 1] = pathLength[stack[i].x][stack[i].y] + 1;
                    newStack.push(this.cells[x][y - 1]);
                }
            }
            stack = newStack;
        }
        let path = [];

        if (pathLength[to.x][to.y] > 0) {
            let current = to;
            path.push(current);
            while (current.x !== from.x || current.y !== from.y) {
                if (path[current.x][current.y] - 1 === path[current.x + 1][current.y]) {
                    current = this.cells[current.x + 1][current.y];
                } else if (path[current.x][current.y] - 1 === path[current.x - 1][current.y]) {
                    current = this.cells[current.x - 1][current.y];
                } else if (path[current.x][current.y] - 1 === path[current.x][current.y + 1]) {
                    current = this.cells[current.x][current.y + 1];
                } else if (path[current.x][current.y] - 1 === path[current.x][current.y - 1]) {
                    current = this.cells[current.x][current.y - 1];
                }
                path.unshift(current);
            }
        }
        return path;


    }
}
