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


export default class Ball {
    constructor(color) {
        this.color = color;

        this.container = new PIXI.Container();


        if (!COLOR_MAP[color]) {
            console.error(new Error("Missing sprite for color " + color));
        }

        const ball = this.ball = new PIXI.Sprite(new PIXI.Texture.fromFrame(COLOR_MAP[color]));
        ball.pivot.x = Math.floor(ball.width / 2);
        ball.pivot.y = Math.floor(ball.height / 2) + 2;

        const animation = this.animation = getAnimation(ANIMATION_MAP[this.color]);
        animation.stop();
        this.animation.visible = false;

        const animationSpawn = this.animationSpawn = getAnimation('start_' + ANIMATION_MAP[this.color]);
        animationSpawn.stop();
        this.animationSpawn.visible = false;

        const animationDestroy = this.animationDestroy = getAnimation('destroy_' + ANIMATION_MAP[this.color]);
        animationDestroy.stop();
        this.animationDestroy.visible = false;

        this.container.addChild(ball);
        this.container.addChild(animation);
        this.container.addChild(animationSpawn);
        this.container.addChild(animationDestroy);

        console.log("ball", ball);
        console.log("animation", animation);
    }

    startSelectedAnimation() {
        this.animation.visible = true;
        this.ball.visible = false;
        this.animation.play();
    }

    stopSelectedAnimation() {
        this.animation.visible = false;
        this.ball.visible = true;
        this.animation.stop();
    }

    startSpawnAnimation() {
        this.animationSpawn.visible = true;
        this.ball.visible = false;
        this.animationSpawn.play();
    }

    stopSpawnAnimation() {
        this.animationSpawn.visible = false;
        this.ball.visible = true;
        this.animationSpawn.stop();
    }

    startDestroyAnimation() {
        this.animationDestroy.visible = true;
        this.ball.visible = false;
        this.animationDestroy.play();
    }

    stopDestroyAnimation() {
        this.animationDestroy.visible = false;
        this.animationDestroy.stop();
    }

    getContainer() {
        return this.container;
    }

    remove() {
        this.startDestroyAnimation();
        setTimeout(() => {
            let index = this.container.parent.getChildIndex(this.container);
            this.container.parent.removeChildAt(index);
        }, 50);
    }
}
