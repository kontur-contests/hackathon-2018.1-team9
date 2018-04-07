

class GameScene {
    constructor(app) {
        this.app = app;

        this.sceneStage = new PIXI.Container();
    }

    update(delta) {

    }

    deactive() {
        this.app.stage.removeChildren(this.sceneStage);
    }

    activate() {
        this.app.stage.addChild(this.sceneStage);
    }
}
