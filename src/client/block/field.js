const sizeCell = 60;
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

    static getCellServer(x, y) {
        return {
            x: Math.ceil(x / sizeCell),
            y: Math.ceil(y / sizeCell),
        }
    }

    static getCellClient(x, y) {
        return {
            x: Math.ceil(x * sizeCell - sizeCell / 2),
            y: Math.ceil(y * sizeCell - sizeCell / 2),
        }
    }
}
