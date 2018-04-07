import Ball from './ball.js';


const sizeCell = 60;



export default class Field extends PIXI.utils.EventEmitter {
    constructor(x, y, scale) {
        super();

        this.container = new PIXI.Container();

        const backgroundSprite = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/field/field-background.jpeg'));

        this.container.addChild(backgroundSprite);

        this.container.x = x;
        this.container.y = y;
    }

    renderField(fieldModel) {
        if (this.container.children.length > 1) {
            this.container.removeChildren(1, this.container.children.length - 1);
        }

        fieldModel.cells.forEach((row, x) => {
           row.forEach((cell, y) => {
               if (cell) {
                   const ball = new Ball('BLUE');
                   const {x: screenX, y: screenY} = Field.getCellClient(x, y);

                   this.container.addChild(ball.getContainer());

                   ball.getContainer().x = screenX;
                   ball.getContainer().y = screenY;
               }
           })
        });
    }

    getContainer() {
        return this.container;
    }

    static getCellServer(x, y) {
        return {
            x: Math.ceil(x / sizeCell),
            y: Math.ceil(y / sizeCell),
        }
    }

    static getCellClient(x, y) {
        return {
            x: Math.ceil(x * sizeCell + sizeCell / 2),
            y: Math.ceil(y * sizeCell + sizeCell / 2),
        }
    }
}
