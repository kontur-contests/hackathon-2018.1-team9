import Field from '../block/field.js';

export default class GameScene {
    constructor(app) {
        this.app = app;

        this.stage = new PIXI.Container();

        this.mainField = new Field(30, 30, 1);

        this.stage.addChild(this.mainField.getContainer());

    }

    update(delta) {
        return this;
    }
}



