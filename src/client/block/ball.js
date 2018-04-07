
export default class Ball{
    constructor(color) {
        this.color = color;

        this.container = new PIXI.Container();
    }

    getContainer() {
        return this.container;
    }
}
