const COLOR_MAP = {
    RED: "sprites/balls/red",
    GREEN: "sprites/balls/green",
    BLUE: "sprites/balls/blue",
    YELLOW: "sprites/balls/yellow",
    MAGENTA: "sprites/balls/rose",
    CYAN: "sprites/balls/lighblue",
    RAINBOW: "sprites/balls/rainbow",
    BLACK: "sprites/balls/black"
};


export default class Ball{
    constructor(color) {
        this.color = color;

        this.container = new PIXI.Container();

        if (!COLOR_MAP[color]) {
            console.error(new Error("Missing sprite for color "+color));
        }

        const ball = new PIXI.Sprite(new PIXI.Texture.fromFrame(COLOR_MAP[color]));
        ball.pivot.x = Math.floor(ball.width / 2);
        ball.pivot.y = Math.floor(ball.height / 2) + 2;

        this.container.addChild(ball);
    }

    getContainer() {
        return this.container;
    }
}
