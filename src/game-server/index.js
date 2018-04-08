const WebSocket = require('ws');
const url = require('url');
const cookieParser = require('cookie-parser')();

const {Player} = require('./server/player.js');
const {Game} = require('./game/game.js');

const players = {};

freePlayers = [];

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
        freePlayers.push(players[playerUid]);

        if (freePlayers.length > 1) {
            const currentPlayers = freePlayers.splice(0, 2);
            const game = new Game(3, 200, 9);

            setTimeout(() => {game.start(currentPlayers[0], currentPlayers[1])}, 500);
        }
    }

    players[playerUid].sockets.push(ws);

    ws.on('message', (message) => {
        console.log('received: %s', message);
        let data = JSON.parse(message);
        if (data['action'] === 'try-move') {
            players[playerUid].calledAction = data;
        }
    });


    ws.on('close', () => {
        if (players[playerUid].sockets.includes(ws)) {
            players[playerUid].sockets.splice(players[playerUid].sockets.indexOf(ws), 1);
        }
    });

    const playerGame = players[playerUid].game;

    if (playerGame) {
        const playerIndex = playerGame.players.indexOf(players[playerUid]);
        const otherPlayerIndex = playerIndex === 0 ? 1 : 0 ;

        const gameData = {
            myBonuses: playerGame.playersBonuses[playerIndex],
            myFieldData: {
                width: playerGame.fields[playerIndex].width,
                height: playerGame.fields[playerIndex].height,
                field: playerGame.fields[playerIndex].cells.map((x) => x.map(
                    (cell) => cell.ball && {color: cell.ball.color, type: "ball", haveBonus: Boolean(cell.ball.bonus)}
                ))
            },
            otherFieldData: {
                width: playerGame.fields[otherPlayerIndex].width,
                height: playerGame.fields[otherPlayerIndex].height,
                field: playerGame.fields[otherPlayerIndex].cells.map((x) => x.map(
                    (cell) => cell.ball && {color: cell.ball.color, type: "ball", haveBonus: Boolean(cell.ball.bonus)}
                ))
            }
        };

        ws.send(JSON.stringify({action: "full-update", data: gameData}));
    }
});
