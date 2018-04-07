let clips = {};

let blocks = {
    ball_black: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/black"]
    },
    ball_blue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/blue1", "sprites/balls/blue2", "sprites/balls/blue3", "sprites/balls/blue4", "sprites/balls/blue5", "sprites/balls/blue6"]
    },
    ball_green: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/green1", "sprites/balls/green2", "sprites/balls/green3", "sprites/balls/green4", "sprites/balls/green5", "sprites/balls/green6"],
    },
    ball_lightblue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/lightblue1", "sprites/balls/lightblue2", "sprites/balls/lightblue3", "sprites/balls/lightblue4", "sprites/balls/lightblue5", "sprites/balls/lightblue6"],
    },
    ball_rainbow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/rainbow"],
    },
    ball_red: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/red1", "sprites/balls/red2", "sprites/balls/red3", "sprites/balls/red4", "sprites/balls/red5", "sprites/balls/red6"],
    },
    ball_rose: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/rose1", "sprites/balls/rose2", "sprites/balls/rose3", "sprites/balls/rose4", "sprites/balls/rose5", "sprites/balls/rose6"],
    },
    ball_yellow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/yellow1", "sprites/balls/yellow2", "sprites/balls/yellow3", "sprites/balls/yellow4", "sprites/balls/yellow5", "sprites/balls/yellow6"],
    },
};


export default function getClipByName(name) {
    let textureArray = [];

    for (let i = 0; i < blocks[name].frames.length; i++) {
        let texture = PIXI.Texture.fromFrame(blocks[name].frames[i]);
        textureArray.push(texture);
    }

    const clip = new PIXI.extras.AnimatedSprite(textureArray);
    clip.pivot = blocks[name].pivot;
    clip.animationSpeed = blocks[name].frameRate;

    return clip;

}


export function initClips() {

}
