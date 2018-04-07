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

        this.mainField.on('click', (cords) => {
            game.clickMyField(cords.x, cords.y);
        });

        game.on('select-cell', (cords) => {
            console.log("Select cell", cords);
            this.mainField.balls[cords.x][cords.y].startSelectedAnimation();
        });

        game.on('deselect-cell', (cords) => {
            this.mainField.balls[cords.x][cords.y].stopSelectedAnimation();
        });

        game.on('move-my-ball', ({from, to}) => {
            this.mainField.moveBall(from ,to);
        });

        game.on('stop-my-ball', ({cell: {x, y}}) => {
            this.mainField.balls[x][y].stopSelectedAnimation();
        });
    }


    fullUpdate (gameData){
        console.log(gameData);

        const fieldModel = new FieldModel(gameData.myFieldData.width, gameData.myFieldData.height);

        gameData.myFieldData.field.forEach((row, x) => {
            row.forEach((cell, y) => {
                fieldModel.cells[x][y] = cell;
            });
        });

        this.game.setMyField(fieldModel);
        this.mainField.renderField(fieldModel);

    }

    update(delta) {
        return this;
    }
}



