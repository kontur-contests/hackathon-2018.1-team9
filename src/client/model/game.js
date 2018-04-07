
export default class GameModel  extends PIXI.utils.EventEmitter {
    constructor() {
        super();

        this.myFieldModel = null;
        this.myFieldInteractive = true;

        this.selectedCell = null;

        const host = location.host;
        this.ws = new WebSocket("ws://" + host + "/ws/");

        this.ws.addEventListener('open', () => {
            this.ws.addEventListener('message', (message) => {
                const data = JSON.parse(message.data);

                if (data.action) {
                    this.emit(data.action, data.data);
                }
            });
        });
    }

    setMyField(field) {
        this.myFieldModel = field;
    }

    clickMyField(x, y) {
        if (this.myFieldInteractive) {
            if (this.myFieldModel.cells[x][y]) {
                if (this.selectedCell) {
                    this.emit('deselect-cell', this.selectedCell);
                }

                if (!this.selectedCell || this.selectedCell.x !== x || this.selectedCell.y !== y) {
                    this.selectedCell = {x, y};

                    this.emit('select-cell', this.selectedCell);
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
