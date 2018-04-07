import getAnimation from '../movieClip/animation.js';

const COLOR_MAP = {
    RED: "sprites/balls/red",
    GREEN: "sprites/balls/green",
    BLUE: "sprites/balls/blue",
    YELLOW: "sprites/balls/yellow",
    MAGENTA: "sprites/balls/rose",
    CYAN: "sprites/balls/lightblue",
    RAINBOW: "sprites/balls/rainbow",
    BLACK: "sprites/balls/black"
};

const ANIMATION_MAP = {
    RED: "ball_red",
    GREEN: "ball_green",
    BLUE: "ball_blue",
    YELLOW: "ball_yellow",
    MAGENTA: "ball_rose",
    CYAN: "ball_lightblue",
    RAINBOW: "ball_rainbow",
    BLACK: "ball_black"
};


export default class Ball{
    constructor(color) {
        this.color = color;

        this.container = new PIXI.Container();

        if (!COLOR_MAP[color]) {
            console.error(new Error("Missing sprite for color "+color));
        }

        const ball = this.ball = new PIXI.Sprite(new PIXI.Texture.fromFrame(COLOR_MAP[color]));
        ball.pivot.x = Math.floor(ball.width / 2);
        ball.pivot.y = Math.floor(ball.height / 2) + 2;

        const animation = this.animation = getAnimation(ANIMATION_MAP[this.color]);
        animation.stop();

        this.container.addChild(ball);
    }

    startSelectedAnimation() {
        this.container.removeChildAt(0);
        this.container.addChild(this.animation);
        this.animation.play();
    }

    stopSelectedAnimation() {
        this.container.removeChildAt(0);
        this.container.addChild(this.ball);
        this.animation.stop();
    }

    getContainer() {
        return this.container;
    }
}
