import Field from '../block/field.js';
import FieldModel from '../model/field.js';
import Bonus from '../block/bonus.js';

export default class GameScene {
    constructor(app, game) {
        this.app = app;
        this.game = game;

        this.stage = new PIXI.Container();

        this.mainField = new Field(30, 180, 1);
        this.secondField = new Field(800, 180, 0.66);
        let style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });

        this.lastTickTime = null;

        this.animationTweens = [];
        this.bonuses = [];

        const background = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/background'));
        background.pivot.x = Math.floor(background.width / 2);
        background.x = Math.floor(app.view.width / 2);
        this.stage.addChild(background);

        this.bonusContainer = new PIXI.Container();
        this.bonusContainer.x = 830;
        this.bonusContainer.y = 600;

        this.stage.addChild(this.mainField.getContainer());
        this.stage.addChild(this.secondField.getContainer());
        this.stage.addChild(this.bonusContainer);

        const start = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/start'));
        start.pivot.x = Math.floor(start.width / 2);
        start.x = Math.floor(app.view.width / 2);
        start.y = Math.floor(app.view.height * 0.4);
        this.stage.addChild(start);
        this.start = start;
        const mainPoints = this.mainPoints = new PIXI.Text('0',style);
        this.mainPoints.x = 320;
        this.mainPoints.y = 140;
        this.stage.addChild(mainPoints);

        const secondPoints = this.secondPoints = new PIXI.Text('0',style);
        this.secondPoints.x = 980;
        this.secondPoints.y = 150;
        this.stage.addChild(secondPoints);

        game.on('full-update', (data) => this.fullUpdate(data));

        this.mainField.on('click', (cords) => {
            game.clickMyField(cords.x, cords.y);
        });

        game.on('select-cell', (cords) => {
            console.log("Select cell", cords);
            console.log(this.mainField.balls[cords.x][cords.y]);
            this.mainField.balls[cords.x][cords.y].startSelectedAnimation();
        });

        game.on('deselect-cell', (cords) => {
            this.mainField.balls[cords.x][cords.y].stopSelectedAnimation();
        });

        game.on('move-my-ball', ({from, to}) => {
            const tween = this.mainField.moveBall(from, to);
            if (tween) {
                this.animationTweens.push(tween);
                tween.call(() => {
                    this.animationTweens.splice(this.animationTweens.indexOf(tween), 1);
                })
            }
        });

        game.on('delete-my-ball', ({cells}) => {
            console.log('scene game', cells);
            for (let i = 0; i < cells.length; i++) {
                this.mainField.deleteBall(cells[i].x, cells[i].y);
            }
        });

        game.on('get-bonus', (data) => {
            const bonus = new Bonus(this.game, data.bonus);
            this.bonuses.push(bonus);

            const idx = this.bonuses.length - 1;

            bonus.getContainer().x = idx % 4 * 50;
            bonus.getContainer().y = Math.floor(idx / 4) * 50;

            this.bonusContainer.addChild(bonus.getContainer());

        });

        game.on('remove-bonus', (data) => {
            let done = false;
            const newBonusList = this.bonuses.filter(bonus => {
                if (done) {
                    return true;
                }

                if (bonus.type === data) {
                    bonus.remove();
                    done = true;
                    return false;
                }
            });

            this.bonuses = newBonusList;

            this.bonuses.forEach((bonus, idx) => {
                bonus.getContainer().x = idx % 4 * 50;
                bonus.getContainer().y = Math.floor(idx / 4) * 50;
            });
        });

        game.on('stop-my-ball', ({cell: {x, y}}) => {
            this.mainField.balls[x][y].stopSelectedAnimation();
        });

        game.on('spawn-my-ball', ({x, y, color, bonus}) => {
            this.mainField.createBall(x, y, color, bonus);
        });

        game.on('add-my-points', (change) => {
            console.log('change!!!',change.pointTotal);
            this.mainPoints.text = change.pointTotal;
            console.log(this.mainPoints.text);
        });


        game.on('move-enemy-ball', ({from, to}) => {
            const tween = this.secondField.moveBall(from, to);

            if (tween) {
                this.animationTweens.push(tween);
                tween.call(() => {
                    this.animationTweens.splice(this.animationTweens.indexOf(tween), 1);
                })
            }
        });

        game.on('delete-enemy-ball', ({cells}) => {
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

        game.on('add-enemy-points', (change) => {
            this.secondPoints.text = change.pointTotal
        });
    }


    fullUpdate(gameData) {
        console.log(gameData);

        let index = this.start.parent.getChildIndex(this.start);
        this.start.parent.removeChildAt(index);

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

        if (this.bonusContainer.children.length) {
            this.bonusContainer.removeChildren(0, this.bonusContainer.children.length - 1);
        }
        this.bonuses = [];

        gameData.myBonuses.forEach((bonusType, idx) => {
            const bonus = new Bonus(this.game, bonusType);
            this.bonuses.push(bonus);

            bonus.getContainer().x = idx % 4 * 50;
            bonus.getContainer().y = Math.floor(idx / 4) * 50;

            this.bonusContainer.addChild(bonus.getContainer());
        })

    }

    update(delta) {

        const time = (new Date()).getTime();

        this.animationTweens.forEach((tween) => {
            tween.advance(delta);
        });

        return this;
    }
}



