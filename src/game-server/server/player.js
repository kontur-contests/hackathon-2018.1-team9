
class Player{
    constructor(uid) {
        this.uid = uid;

        this.sockets = [];
        this.game = null;
        this.calledAction = null;
        this.ballInteractive = true;
    }
}

module.exports = {Player};
