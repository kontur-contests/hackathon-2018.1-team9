let clips = {};

let blocks = {
    start_ball_blue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-blue5.png","sprites/balls/start-blue6.png","sprites/balls/start-blue7.png","sprites/balls/start-blue8.png","sprites/balls/start-blue1.png",]
    },

    start_ball_yellow: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-yellow5.png","sprites/balls/start-yellow6.png","sprites/balls/start-yellow7.png","sprites/balls/start-yellow8.png","sprites/balls/start-yellow1.png",]
    },

    start_ball_green: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-green5.png","sprites/balls/start-green6.png","sprites/balls/start-green7.png","sprites/balls/start-green8.png","sprites/balls/start-green1.png",]
    },

    start_ball_lightblue: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-lightblue5.png","sprites/balls/start-lightblue6.png","sprites/balls/start-lightblue7.png","sprites/balls/start-lightblue8.png","sprites/balls/start-lightblue1.png",]
    },

    start_ball_red: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-red5.png","sprites/balls/start-red6.png","sprites/balls/start-red7.png","sprites/balls/start-red8.png","sprites/balls/start-red1.png",]
    },

    start_ball_rose: {
        pivot: {
            x: 30,
            y: 30
        },
        frameRate: 0.28,
        frames: ["sprites/balls/start-rose5.png","sprites/balls/start-rose6.png","sprites/balls/start-rose7.png","sprites/balls/start-rose8.png","sprites/balls/start-rose1.png",]
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
    if (clips.length === 0) {
        initClips();
    }

    return clips[name] || null;

}


export function initClips() {
    for (let color in blocks) {
        let textureArray = [];

        for (let i = 0; i < blocks[color].frames.length; i++) {
            let texture = PIXI.Texture.fromFrame(blocks[color].frames[i]);
            textureArray.push(texture);
        }

        clips[color] = new PIXI.extras.AnimatedSprite(textureArray);
        clips[color].pivot = blocks[color].pivot;
        clips[color].animationSpeed = blocks[color].frameRate;

    }
}
