import GameScene from './game.js';

default export class LoaderScene {
    constructor(app) {
        this.app = app;

        this.stage = new PIXI.Container();

        this.done = false;

        const loader = PIXI.loaders.Loader;

        loader.add();

        loader.onLoad.add(() => {

        });

        loader.onComplete.add(() => {

        });
    }

    update(delta) {
        if (this.done) {
            return
        }

        return this;
    }
}
