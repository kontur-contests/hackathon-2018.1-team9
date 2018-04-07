import Ball from './ball.js';

const sizeCell = 60;

export default class Field extends PIXI.utils.EventEmitter {
    constructor(x, y, scale) {
        super();

        this.container = new PIXI.Container();

        const backgroundSprite = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/field/field-background'));

        this.container.addChild(backgroundSprite);

        this.container.x = x;
        this.container.y = y;

        this.container.interactive = true;
        this.container.on('pointerdown', (evt)=>{
            const coordinate = this.container.toLocal(evt.data.global);

            this.emit('click', Field.getCell(coordinate.x,coordinate.y));
        });

        this.balls = [];

    }

    moveBall(from, to) {
        const {x, y} = from;
        const {x: x1, y: y1} = to;
        const ball = this.balls[x][y];

        if (ball) {
            ball.startSelectedAnimation();
            this.balls[x][y] = null;
            if (!this.balls[x1]) {
                this.balls[x1] = [];
            }
            this.balls[x1][y1] = ball;

            const tween =  new createjs.Tween.get(ball.getContainer()).to(Field.getCellPixel(x1, y1), 250)
                .call(() => {
                    //ball.stopSelectedAnimation();
                });

            return tween;
        }
    }

    renderField(fieldModel) {
        if (this.container.children.length > 1) {
            this.container.removeChildren(1, this.container.children.length - 1);
        }

        fieldModel.cells.forEach((row, x) => {
           row.forEach((cell, y) => {
               if (cell) {
                   const ball = new Ball(cell.color);
                   const {x: screenX, y: screenY} = Field.getCellPixel(x, y);

                   if (!this.balls[x]) {
                       this.balls[x] = [];
                   }
                   this.balls[x][y] = ball;

                   this.container.addChild(ball.getContainer());

                   ball.getContainer().x = screenX;
                   ball.getContainer().y = screenY;
               }
           })
        });
    }

    createBall(x, y, color) {
        console.log(x, y, color);
        const ball = new Ball(color);
        const {x: screenX, y: screenY} = Field.getCellPixel(x, y);

        if (!this.balls[x]) {
            this.balls[x] = [];
        }
        this.balls[x][y] = ball;

        this.container.addChild(ball.getContainer());

        ball.getContainer().x = screenX;
        ball.getContainer().y = screenY;
    }

    deleteBall(x,y){
        console.log('block field',x,y);
        this.balls[x][y].remove();
        this.balls[x][y] = null;
    }

    getContainer() {
        return this.container;
    }

    static getCell(x, y) {
        let cellX = Math.floor((x - 29) / sizeCell);
        let cellY = Math.floor((y - 21) / sizeCell);

        if (cellX < 0) {
            cellX = 0;
        }

        if (cellY < 0) {
            cellY = 0;
        }

        return {
            x: cellX,
            y: cellY,
        }
    }

    static getCellPixel(x, y) {
        return {
            x: Math.ceil(x * sizeCell + sizeCell / 2) + 29,
            y: Math.ceil(y * sizeCell + sizeCell / 2) + 21,
        }
    }
}
