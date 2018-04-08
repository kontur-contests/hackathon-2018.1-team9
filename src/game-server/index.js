const WebSocket = require('ws');
const url = require('url');
const cookieParser = require('cookie-parser')();

const {Player} = require('./server/player.js');
const {Game} = require('./game/game.js');

const players = {};

freePlayers = [];

const wss = new WebSocket.Server({
    port: 3001,
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

            game.onEnd = () => {
                setTimeout(() => {
                    game.players.forEach((player) => {
                        players[player.uid] = null;
                    })
                }, 2000);

            };

            setTimeout(() => {game.start(currentPlayers[0], currentPlayers[1])}, 500);


        }
    }

    players[playerUid].sockets.push(ws);

    ws.on('message', (message) => {
        let data = JSON.parse(message);
        if (data.action) {
            players[playerUid].calledAction = data;
        }
    });


    ws.on('close', () => {
        if (players[playerUid] && players[playerUid].sockets.includes(ws)) {
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
                    (cell) => cell.ball && {
                        color: cell.ball.color,
                        type: "ball",
                        haveBonus: Boolean(cell.ball.bonus),
                        snow: cell.ball.snow
                    }
                )),
                points: playerGame.points[0],

            },
            otherFieldData: {
                width: playerGame.fields[otherPlayerIndex].width,
                height: playerGame.fields[otherPlayerIndex].height,
                field: playerGame.fields[otherPlayerIndex].cells.map((x) => x.map(
                    (cell) => cell.ball && {
                        color: cell.ball.color,
                        type: "ball",
                        haveBonus: Boolean(cell.ball.bonus),
                        snow: cell.ball.snow
                    }
                )),
                points: playerGame.points[1],

            }
        };

        ws.send(JSON.stringify({action: "full-update", data: gameData}));
    }
});
