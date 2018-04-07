
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
        switch (change.action) {
            case "move-ball":
                const field = change.onMyField ? this.myFieldModel : null;
                const {x, y} = change.from;
                const {x: x1, y: y1} = change.to;
                const ball = field.cells[x][y];
                field.cells[x1][y1] = ball;
                field.cells[x][y] = null;
                if (change.onMyField) {
                    this.emit('move-my-ball', {from: change.from, to: change.to});
                }

                break;
            case "stop-ball-animation":
                if (change.onMyField) {
                    this.emit('stop-my-ball', {cell: change.cell});
                }

                break;
        }
    }

    setMyField(field) {
        this.myFieldModel = field;
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
