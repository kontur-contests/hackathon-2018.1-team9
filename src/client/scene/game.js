import Field from '../block/field.js';
import FieldModel from '../model/field.js';

export default class GameScene {
    constructor(app, game) {
        this.app = app;
        this.game = game;

        this.stage = new PIXI.Container();

        this.mainField = new Field(30, 180, 1);
        this.secondField = new Field(800, 180, 1);

        this.lastTickTime = null;

        this.animationTweens = [];

        const background = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/background'));
        background.pivot.x = Math.floor(background.width / 2);
        background.x = Math.floor(app.view.width / 2);
        this.stage.addChild(background);

        this.stage.addChild(this.mainField.getContainer());
        this.stage.addChild(this.secondField.getContainer());

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
            const tween = this.mainField.moveBall(from ,to);
            tween.startTime = this.lastTickTime;

            this.animationTweens.push(tween);
        });

        game.on('delete-my-ball', (cells) => {
            for (let i = 0; i < cells.length; i++) {
                this.mainField.deleteBall(cells[i].x, cells[i].y);
            }
        });

        game.on('stop-my-ball', ({cell: {x, y}}) => {
            this.mainField.balls[x][y].stopSelectedAnimation();
        });

        game.on('spawn-my-ball', ({x, y, color}) => {
            this.mainField.createBall(x, y, color);
        });


        game.on('move-enemy-ball', ({from, to}) => {
            const tween = this.secondField.moveBall(from ,to);
            tween.startTime = this.lastTickTime;

            this.animationTweens.push(tween);
        });

        game.on('delete-enemy-ball', (cells) => {
            for (let i = 0; i < cells.length; i++) {
                this.secondField.deleteBall(cells[i].x, cells[i].y);
            }
        });

        game.on('stop-enemy-ball', ({cell: {x, y}}) => {
            this.secondField.balls[x][y].stopSelectedAnimation();
        });

        game.on('spawn-enemy-ball', ({x, y, color}) => {
            this.secondField.createBall(x, y, color);
        });
    }


    fullUpdate(gameData) {
        console.log(gameData);

        const fieldModel = new FieldModel(gameData.myFieldData.width, gameData.myFieldData.height);

        gameData.myFieldData.field.forEach((row, x) => {
            row.forEach((cell, y) => {
                fieldModel.cells[x][y] = cell;
            });
        });

        this.game.setMyField(fieldModel);
        this.mainField.renderField(fieldModel);

        const enemyFieldModel = new FieldModel(gameData.otherFieldData.width, gameData.otherFieldData.height);

        gameData.otherFieldData.field.forEach((row, x) => {
            row.forEach((cell, y) => {
                enemyFieldModel.cells[x][y] = cell;
            });
        });

        this.game.setEnemyField(enemyFieldModel);
        this.secondField.renderField(enemyFieldModel);

    }

    update(delta) {

        const time = (new Date()).getTime();

        this.animationTweens.forEach((tween) => {
            tween.advance(delta);
        });

        return this;
    }
}



