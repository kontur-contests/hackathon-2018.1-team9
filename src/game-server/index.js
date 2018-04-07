const WebSocket = require('ws');
const url = require('url');
const cookieParser = require('cookie-parser')();

const {Player} = require('./server/player.js');
const {Game} = require('./game/game.js');

const players = {};

const wss = new WebSocket.Server({
    port: 3001,
    perMessageDeflate: {
        zlibDeflateOptions: { // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3,
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        clientMaxWindowBits: 10,       // Defaults to negotiated value.
        serverMaxWindowBits: 10,       // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10,          // Limits zlib concurrency for perf.
        threshold: 1024,               // Size (in bytes) below which messages
                                       // should not be compressed.
    }
});

wss.on('connection', (ws, req) => {
    cookieParser(req, null, () => {
    });

    const playerUid = req.cookies.playerUid;

    if (!players[playerUid]) {
        players[playerUid] = new Player(playerUid);
        const game = new Game(3, 200, 9);
        game.start(players[playerUid]);
    }

    players[playerUid].sockets.push(ws);

    ws.on('message', (message) => {
        console.log('received: %s', message);
        let data = JSON.parse(message);
        if (data['action'] === 'try-move') {
            ws.send(JSON.stringify(tryMove(data['data']['from'], data['data']['to'])));
        }
    });

    function tryMove(from, to) {
        let data = players[playerUid].game.fields[0].findWay(from, to);
        let plainData = [];
        for (let i = 0; i < data.length; i++) {
            plainData.push(data[i].toPlain());
        }
        console.log(plainData);
        return plainData;
    }

    ws.on('close', () => {
        if (players[playerUid].sockets.includes(ws)) {
            players[playerUid].sockets.splice(players[playerUid].sockets.indexOf(ws), 1);
        }
    });

    const playerGame = players[playerUid].game;

    const gameData = {
        myFieldData: {
            width: playerGame.fields[0].width,
            height: playerGame.fields[0].height,
            field: playerGame.fields[0].cells.map((x) => x.map(
                (cell) => cell.ball && {color: cell.ball.color, type: "ball"}
            ))
        }
    };

    ws.send(JSON.stringify({action: "full-update", data: gameData}));
});
