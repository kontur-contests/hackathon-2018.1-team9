import LoaderScene from './scene/loader.js';

    const width = 1250;
    const height = 600;
    let app = new PIXI.Application({width: width, height: height, backgroundColor: 0xaaaadd});


    let currentScene = new LoaderScene(app);

    document.body.appendChild(app.view);

    app.ticker.add((delta) => {
        const newScene = currentScene.update(delta);

        if (newScene !== currentScene) {
            app.stage.removeChildren(currentScene.stage);
            app.stage.addChild(currentScene.stage);
        }

    });


    console.log(navigator.cookies);

    const ws = new WebSocket("ws://localhost:8081/ws/");

    ws.addEventListener('open', () => {
       ws.addEventListener('message', (data) => {
           console.log("==>", data);
       });

       ws.send("Message");
    });
