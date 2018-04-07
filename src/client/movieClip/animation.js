let clips = {};

let blocks = {
    start_ball_blue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-blue5","sprites/balls/start-blue6","sprites/balls/start-blue7","sprites/balls/start-blue8","sprites/balls/start-blue1",]
    },

    start_ball_yellow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-yellow5","sprites/balls/start-yellow6","sprites/balls/start-yellow7","sprites/balls/start-yellow8","sprites/balls/start-yellow1",]
    },

    start_ball_green: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-green5","sprites/balls/start-green6","sprites/balls/start-green7","sprites/balls/start-green8","sprites/balls/start-green1",]
    },

    start_ball_lightblue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-lightblue5","sprites/balls/start-lightblue6","sprites/balls/start-lightblue7","sprites/balls/start-lightblue8","sprites/balls/start-lightblue1",]
    },

    start_ball_red: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-red5","sprites/balls/start-red6","sprites/balls/start-red7","sprites/balls/start-red8","sprites/balls/start-red1",]
    },

    start_ball_rose: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-rose5","sprites/balls/start-rose6","sprites/balls/start-rose7","sprites/balls/start-rose8","sprites/balls/start-rose1",]
    },


    destroy_ball_black: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/black"]
    },
    start_ball_black: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/black4","sprites/balls/destroy/black3","sprites/balls/destroy/black2","sprites/balls/destroy/black1"]
    },
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
    start_ball_rainbow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/rainbow"],
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
    destroy_ball_blue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/blue1", "sprites/balls/destroy/blue2", "sprites/balls/destroy/blue3", "sprites/balls/destroy/blue4",]
    },
    destroy_ball_green: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/green1", "sprites/balls/destroy/green2", "sprites/balls/destroy/green3", "sprites/balls/destroy/green4",]
    },
    destroy_ball_lightblue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/lightblue1", "sprites/balls/destroy/lightblue2", "sprites/balls/destroy/lightblue3", "sprites/balls/destroy/lightblue4",]
    },
    destroy_ball_red: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/red1", "sprites/balls/destroy/red2", "sprites/balls/destroy/red3", "sprites/balls/destroy/red4",]
    },
    destroy_ball_rose: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/rose1", "sprites/balls/destroy/rose2", "sprites/balls/destroy/rose3", "sprites/balls/destroy/rose4",]
    },
    destroy_ball_yellow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/yellow1", "sprites/balls/destroy/yellow2", "sprites/balls/destroy/yellow3", "sprites/balls/destroy/yellow4",]
    },
    destroy_ball_rainbow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/destroy/color1", "sprites/balls/destroy/color2", "sprites/balls/destroy/color3", "sprites/balls/destroy/color4",]
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
