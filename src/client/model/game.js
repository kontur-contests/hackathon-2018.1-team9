
export default class GameModel  extends PIXI.utils.EventEmitter {
    constructor() {
        super();

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
}
