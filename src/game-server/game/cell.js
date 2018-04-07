class Cell {
    constructor(field, x, y) {
        this.field = field;
        this.x = x;
        this.y = y;

        this.ball = null;
    }
    toPlain(){
        return {
            x:this.x,
            y:this.y,
        }
    }
}

module.exports = {Cell};
