import LoaderScene from './scene/loader.js';

const width = 1250;
const height = 600;
let app = new PIXI.Application({width: width, height: height, backgroundColor: 0xaaaadd});


let currentScene = new LoaderScene(app);
app.stage.addChild(currentScene.stage);

document.body.appendChild(app.view);

app.ticker.add((delta) => {
    const newScene = currentScene.update(delta);

    if (newScene !== currentScene) {
        app.stage.removeChildAt(app.stage.getChildIndex(currentScene.stage));
        app.stage.addChild(newScene.stage);
    }

    currentScene = newScene;

});


console.log(navigator.cookies);
const host = location.host;
const ws = new WebSocket("ws://"+host+"/ws/");

ws.addEventListener('open', () => {
   ws.addEventListener('message', (data) => {
       console.log("==>", data);
   });

   ws.send("Message");
});
