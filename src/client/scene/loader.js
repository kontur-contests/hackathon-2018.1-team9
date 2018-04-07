import GameScene from './game.js';
import GameModel from '../model/game.js';
import {initClips} from '../movieClip/animation.js';

export default class LoaderScene {
    constructor(app) {
        this.app = app;

        this.stage = new PIXI.Container();

        this.done = false;

        const loader = app.loader;

        loader.add('/assets/sprites.json')
            .add('pole.png', '/pole.png');

        loader.onLoad.add((file) => {
            console.log("file", file);
        });

        loader.onComplete.add(() => {
            initClips();
            this.done = true;
        });

        loader.load();
    }

    update(delta) {
        if (this.done) {
            console.log("Game scene");
            return new GameScene(this.app, new GameModel());
        }

        return this;
    }
}
