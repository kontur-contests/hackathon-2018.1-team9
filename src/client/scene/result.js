import Field from '../block/field.js';
import FieldModel from '../model/field.js';
import Bonus from '../block/bonus.js';

export default class ResultScene {
    constructor(result) {
        console.log(result);
        result = result.result;

        this.stage = new PIXI.Container();

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


        const background = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/background'));
        background.pivot.x = Math.floor(background.width / 2);
        background.x = Math.floor(600);
        this.stage.addChild(background);

        let first;
        let second;

        if (result.win) {
            first = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/win'));
            second = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/loose'));
        } else {
            first = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/loose'));
            second = new PIXI.Sprite(new PIXI.Texture.fromFrame('sprites/win'));
        }
        first.x = Math.floor(50);
        first.y = Math.floor(300);
        this.stage.addChild(first);

        second.x = Math.floor(600);
        second.y = Math.floor(340);
        this.stage.addChild(second);

        let text = 'Ты ' + (result.win ? 'победил!' : 'проиграл :(');
        const textResult = this.mainPoints = new PIXI.Text(text, style);
        textResult.x =500;
        textResult.y = 250;
        this.stage.addChild(textResult);
console.log(result);
        const mainPoints = this.mainPoints = new PIXI.Text(result.myPoints, style);
        this.mainPoints.x = 400;
        this.mainPoints.y = 250;
        this.stage.addChild(mainPoints);

        const secondPoints = this.secondPoints = new PIXI.Text(result.otherPoints, style);
        this.secondPoints.x = 800;
        this.secondPoints.y = 250;
        this.stage.addChild(secondPoints);


    }


    update(delta) {


        return this;
    }
}



