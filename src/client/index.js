(function(){
//Create a Pixi Application
    const width = 1250;
    const height = 600;
    let app = new PIXI.Application({width: width, height: height, backgroundColor: 0xaaaadd});



//Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    const cell = PIXI.Sprite.fromImage('/pole.png');
    const ball = PIXI.Sprite.fromImage('/shar.png');

    const field = [];
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const cell = PIXI.Sprite.fromImage('/pole.png');
            cell.pivot.x = 27 ;
            cell.pivot.y = 27;
            cell.x = y * 60 + 28 + 20;
            cell.y = x * 60 + 28 + 20;
            app.stage.addChild(cell);
            field.push(cell);

            if (Math.random() > 0.8) {
                const ball = PIXI.Sprite.fromImage('shar.png');
                ball.pivot.x = 23 ;
                ball.pivot.y = 23;
                ball.x = y * 60 + 28 + 20;
                ball.y = x * 60 + 28 + 20;
                app.stage.addChild(ball);
            }
        }
    }



    // app.ticker.add((delta) => {
    //
    // });


})();


(function(){
    console.log(navigator.cookies);

    const ws = new WebSocket("ws://localhost:8081/ws/");

    ws.addEventListener('open', () => {
       ws.addEventListener('message', (data) => {
           console.log("==>", data);
       });

       ws.send("Message");
    });
})();
