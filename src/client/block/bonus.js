const CONFIG = {
    "BLACK_BALL": {
        frame: "sprites/balls/black",
        scale: 0.5
    }
};


export default class Bonus {
    constructor(game, type) {
        this.game = game;
        this.type = type;

        this.container = new PIXI.Container();


        if (!CONFIG[type]) {
            console.error(new Error("Missing bonus type for " + type));
        }

        const bonusIcon = this.bonusIcon = new PIXI.Sprite(new PIXI.Texture.fromFrame(CONFIG[type].frame));
        bonusIcon.pivot.x = Math.floor(bonusIcon.width / 2);
        bonusIcon.pivot.y = Math.floor(bonusIcon.height / 2);
        bonusIcon.scale.x = CONFIG[type].scale;
        bonusIcon.scale.y = CONFIG[type].scale;

        this.container.addChild(bonusIcon);

        this.container.interactive = true;
        this.container.on('pointerdown', () => {
            this.game.activateBonus(this);
        });
    }

    getContainer() {
        return this.container;
    }

    remove() {
        this.container.parent.removeChildAt(this.container.parent.getChildIndex(this.container))
    }
}
