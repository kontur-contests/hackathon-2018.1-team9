const CONFIG = {
    "BLACK_BALL": {
        frame: "sprites/balls/black",
        scale: 0.5
    }
};


export default class Bonus {
    constructor(type) {
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
    }

    getContainer() {
        return this.container;
    }
}
