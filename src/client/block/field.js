
export default class Field {
    constructor(x, y, scale) {
        this.container = new PIXI.Container();

        const backgroundSprite = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/field/field-background.jpeg'));

        this.container.addChild(backgroundSprite);

        this.container.x = x;
        this.container.y = y;
    }

    getContainer() {
        return this.container;
    }
}
