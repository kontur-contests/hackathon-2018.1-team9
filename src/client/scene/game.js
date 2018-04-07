import Field from '../block/field.js';
import FieldModel from '../model/field.js';

export default class GameScene {
    constructor(app) {
        this.app = app;

        this.stage = new PIXI.Container();

        this.mainField = new Field(30, 30, 1);

        const fieldModel = new FieldModel(9, 9);

        fieldModel.cells[4][5] = 1;
        fieldModel.cells[6][5] = 1;

        this.mainField.renderField(fieldModel);

        this.stage.addChild(this.mainField.getContainer());

    }

    update(delta) {
        return this;
    }
}



