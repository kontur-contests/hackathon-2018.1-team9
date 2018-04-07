const {Field} = require('./field.js');
const {Ball, COLORS} = require('./ball.js');

const TICK_DELAY = 250;

const DROP_COLORS = [
    COLORS.BLUE, COLORS.CYAN, COLORS.GREEN, COLORS.MAGENTA, COLORS.RED, COLORS.YELLOW
];

class Game {
    constructor(dropSize, targetScore, fieldSize) {
        this.dropSize = dropSize;
        this.targetScore = targetScore;
        this.fields = [
            new Field(fieldSize, fieldSize),
            new Field(fieldSize, fieldSize)
        ];
        this.points = [
            0,
            0,
        ];

        this.fieldSize = fieldSize;

        this.dropColors = [];
        this.dropPositions = [];

        this.tickNumber = 0;

        this.paused = true;
        this.lastTickTime = null;

        this.players = [];

        this.playersTickChanges = [
            [], []
        ];

        this.commonTickActions = {};
    }

    start(player1) {
        this.players.push(player1);
        player1.game = this;

        this.doDropToField(this.fields[0]);
        this.doDropToField(this.fields[0]);

        this.paused = false;
        this.tick();
    }

    tick() {
        if (this.lastTickTime === null) {
            this.lastTickTime = (new Date()).getTime();
            setTimeout(() => this.tick(), TICK_DELAY);

            return;
        }

        this.tickNumber += 1;

        this.processPlayerActions(this.players[0]);
        this.processCommonAction();

        const changes1 = JSON.stringify({tick: this.tickNumber, changes: this.playersTickChanges[0]});

        this.players[0].sockets.forEach(socket => {
            socket.send(changes1);
        });

        this.playersTickChanges = [
            [], []
        ];

        const newDate = (new Date()).getTime();
        let timeToNextTick = TICK_DELAY - (newDate - this.lastTickTime - TICK_DELAY);

        if (timeToNextTick < TICK_DELAY / 2) {
            timeToNextTick = TICK_DELAY / 2;
        }

        setTimeout(() => this.tick(), timeToNextTick);
        this.lastTickTime = newDate;
    }

    processPlayerActions(player) {
        if (!player.calledAction) {
            return;
        }

        const playerIndex = this.players.indexOf(player);
        const field = this.fields[playerIndex];

        switch (player.calledAction.action) {
            case 'try-move':
                if (player.ballInteractive) {
                    const way = field.findWay(player.calledAction.data.from, player.calledAction.data.to);
                    if (way.length) {
                        player.ballInteractive = false;
                        this.playersTickChanges[0].push({ballInteractive: false});
                        way.forEach((cell, idx, arr) => {
                            if (idx === arr.length - 1) {
                                return;
                            }

                            this.commonTickActions[this.tickNumber + idx] =
                                this.commonTickActions[this.tickNumber + idx] || [];

                            this.commonTickActions[this.tickNumber + idx].push({
                                action: "move-ball",
                                field: field,
                                from: cell.toPlain(),
                                to: arr[idx + 1].toPlain()
                            });
                        });

                        this.commonTickActions[this.tickNumber + way.length - 1] =
                            this.commonTickActions[this.tickNumber + way.length - 1] || [];

                        this.commonTickActions[this.tickNumber + way.length - 1].push({
                            action: "enable-ball-interactive",
                            player: player,
                        });
                        this.commonTickActions[this.tickNumber + way.length - 2].push({
                            action: "stop-ball-animation",
                            field: field,
                            cell: way[way.length - 1].toPlain()
                        });
                        this.commonTickActions[this.tickNumber + way.length - 1].push({
                            action: "check-line",
                            field: field,
                        });
                    } else {
                        this.playersTickChanges[0].push("badTurnTry");
                    }
                }
                break;
        }

        player.calledAction = null;
    }

    processCommonAction() {
        if (this.commonTickActions[this.tickNumber]) {
            this.commonTickActions[this.tickNumber].forEach((data) => {
                switch (data.action) {
                    case "move-ball":
                        const {x, y} = data.from;
                        const {x: x1, y: y1} = data.to;
                        const ball = data.field.cells[x][y].ball;
                        if (ball && !data.field.cells[x1][y1].ball) {
                            data.field.cells[x][y].ball = null;
                            data.field.cells[x1][y1].ball = ball;

                            this.playersTickChanges[0].push({
                                action: "move-ball",
                                onMyField: true,
                                from: data.from,
                                to: data.to
                            });
                        }
                        break;
                    case "stop-ball-animation":
                        this.playersTickChanges[0].push({
                            action: "stop-ball-animation",
                            onMyField: true,
                            cell: data.cell
                        });
                        break;
                    case "enable-ball-interactive": {
                            data.player.ballInteractive = true;
                            const playerIndex = this.players.indexOf(data.player);

                            this.playersTickChanges[playerIndex].push("enable-ball-interactive");
                        }
                        break;
                    case "check-line":
                        const field = data.field;
                        const playerIndex = this.fields.indexOf(field);
                        let {point, cells} = field.getLines();
                        let cellsPlain = [];
                        if (cells.length > 0) {
                            this.points[0] += point;
                            for (let i = 0; i < cells.length; i++) {
                                cellsPlain.push(cells[i].toPlain());
                                cells[i].ball = null;
                            }

                            this.playersTickChanges[playerIndex].push({
                                action: "delete-ball",
                                onMyField: true,
                                cells: cellsPlain,
                            });
                            this.playersTickChanges[playerIndex].push({
                                action: "add-points",
                                onMyField: true,
                                pointAdd: point,
                                pointTotal: this.points[playerIndex]
                            });
                        } else {
                            const drops = this.doDropToField(field);

                            this.playersTickChanges[playerIndex].push({
                                action: "spawn-balls",
                                onMyField: true,
                                drops: drops.map(drop => {
                                   return {
                                       position: drop.position,
                                       color: drop.ball.color
                                   }
                                })
                            });
                        }

                        break;
                }
            });

            delete(this.commonTickActions[this.tickNumber]);
        }
    }

    getDropColors(dropNumber) {
        while (this.dropColors.length < dropNumber + 1) {
            const drop = [];

            for (let i = 0; i < this.dropSize; i++) {
                if (Math.random() <= 0.02) {
                    drop.push(COLORS.BLACK);
                } else if (Math.random() <= 0.07) {
                    drop.push(COLORS.RAINBOW);
                } else {
                    drop.push(DROP_COLORS[Math.floor(Math.random() * DROP_COLORS.length)]);
                }
            }

            this.dropColors.push(drop);
        }

        return this.dropColors[dropNumber];
    }

    getDropPositions(dropNumber) {
        while (this.dropPositions.length < dropNumber + 1) {
            const drop = [];

            for (let i = 0; i < this.dropSize; i++) {
                drop.push(Math.floor(Math.random() * this.fieldSize * this.fieldSize));
            }

            this.dropPositions.push(drop);
        }

        return this.dropPositions[dropNumber];
    }

    /**
     *
     * @param {Field} field
     * @returns {Array}
     */
    doDropToField(field) {
        const dropColors = this.getDropColors(field.nextDrop);
        const dropPositions = this.getDropPositions(field.nextDrop);

        const dropResult = [];

        for (let p = 0; p < dropPositions.length; p++) {
            const ball = new Ball(dropColors[p]);

            const {x, y} = field.placeDrop(ball, dropPositions[p]);

            dropResult.push({position: {x, y}, ball});
        }

        field.nextDrop += 1;

        return dropResult;
    }
}

module.exports = {
    Game
};
