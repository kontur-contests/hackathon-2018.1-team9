import Field from '../block/field.js';
import FieldModel from '../model/field.js';

export default class GameScene {
    constructor(app, game) {
        this.app = app;
        this.game = game;

        this.stage = new PIXI.Container();

        this.mainField = new Field(30, 30, 1);

        this.stage.addChild(this.mainField.getContainer());

        game.on('full-update', (data) => this.fullUpdate(data));
    }


    fullUpdate (gameData){
        console.log(gameData);

        const fieldModel = new FieldModel(gameData.myFieldData.width, gameData.myFieldData.height);

        gameData.myFieldData.field.forEach((row, x) => {
            row.forEach((cell, y) => {
                fieldModel.cells[x][y] = cell;
            });
        });


        this.mainField.renderField(fieldModel);

    }

    update(delta) {
        return this;
    }
}



