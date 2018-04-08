
export default class GameModel  extends PIXI.utils.EventEmitter {
    constructor() {
        super();

        this.myFieldModel = null;
        this.myFieldInteractive = true;

        this.selectedCell = null;
        this.tickNumber = 0;

        const host = location.host;
        this.ws = new WebSocket("ws://" + host + "/ws/");

        this.ws.addEventListener('open', () => {
            this.ws.addEventListener('message', (message) => {
                const data = JSON.parse(message.data);

                if (data.action) {
                    this.emit(data.action, data.data);
                }

                if (data.tick) {
                    this.processTick(data);
                }
            });
        });
    }

    processTick(data) {
        this.tickNumber = data.tick;
        this.tickTime = new Date();

        data.changes.forEach(change => {
            console.log("Tick", this.tickNumber, change);
            switch (change) {
                case "badTurnTry":
                    this.myFieldInteractive = true;
                    break;
                case "enable-ball-interactive":
                    this.myFieldInteractive = true;
                    this.selectedCell = null;
                    break;

                default:
                    if (typeof change === 'object') {
                        this.processChange(change);
                    }
            }
        });
    }

    processChange(change) {
        const field = change.onMyField ? this.myFieldModel : this.enemyFieldModel;
        switch (change.action) {
            case "move-ball":
                const {x, y} = change.from;
                const {x: x1, y: y1} = change.to;
                const ball = field.cells[x][y];
                field.cells[x1][y1] = ball;
                field.cells[x][y] = null;
                if (change.onMyField) {
                    this.emit('move-my-ball', {from: change.from, to: change.to});
                } else {
                    this.emit('move-enemy-ball', {from: change.from, to: change.to});
                }

                break;
            case "delete-ball":
                console.log('delete-ball');
                console.log('myField',change.onMyField);
                if (change.onMyField) {
                    console.log(change.cells);
                    for (let i = 0; i < change.cells.length; i++) {
                        field.cells[change.cells[i].x][change.cells[i].y] = null;
                    }
                    this.emit('delete-my-ball', {cells: change.cells});
                } else{
                    this.emit('delete-enemy-ball', {cells: change.cells});
                }
                break;

            case "spawn-balls":
                change.drops.forEach((drop) => {
                    const {x, y} = drop.position;
                    field.cells[x][y] = {color: drop.color};

                    if (change.onMyField) {
                        this.emit('spawn-my-ball', {x, y, color: drop.color, bonus: drop.haveBonus});
                    } else {
                        this.emit('spawn-enemy-ball', {x, y, color: drop.color});
                    }
                });
                break;

            case "stop-ball-animation":
                if (change.onMyField) {
                    this.emit('stop-my-ball', {cell: change.cell});
                } else {
                    this.emit('stop-enemy-ball', {cell: change.cell});
                }
                break;
        }
    }

    setMyField(field) {
        this.myFieldModel = field;
    }

    setEnemyField(field) {
        this.enemyFieldModel = field;
    }

    clickMyField(x, y) {
        console.log("Click field", x, y);
        console.log(this.myFieldInteractive);
        if (this.myFieldInteractive) {
            if (this.myFieldModel.cells[x][y]) {
                if (this.selectedCell) {
                    this.emit('deselect-cell', this.selectedCell);
                }

                if (!this.selectedCell || this.selectedCell.x !== x || this.selectedCell.y !== y) {
                    this.selectedCell = {x, y};

                    this.emit('select-cell', this.selectedCell);
                } else {
                    this.selectedCell = null;
                }
            } else if (this.selectedCell) {
                this.myFieldInteractive = false;
                this.ws.send(JSON.stringify({
                    action: 'try-move',
                    data: {
                        from: this.selectedCell,
                        to: {x, y}
                    }
                }));
            }
        }
    }
}
