
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
                   const ball = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/balls/blue'));

                   this.container.addChild(ball);
                   ball.x = x * 50;
                   ball.y = y * 50;
               }
           })
        });
    }

    getContainer() {
        return this.container;
    }
}
