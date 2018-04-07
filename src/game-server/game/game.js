const {Field} = require('./field.js');
const {Ball, COLORS} = require('./ball.js');

const DROP_COLORS = [
    COLORS.BLUE, COLORS.CYAN, COLORS.GREEN, COLORS.MAGENTA, COLORS.RED, COLORS.YELLOW
];

class Game {
    constructor(dropSize, targetScore, fieldSize){
        this.dropSize = dropSize;
        this.targetScore = targetScore;
        this.fields = [
            new Field(fieldSize, fieldSize),
            new Field(fieldSize, fieldSize)
        ];

        this.fieldSize = fieldSize;

        this.dropColors = [];
        this.dropPositions = [];
    }

    start(player1) {
        this.player1 = player1;
        this.player1.game = this;

        this.doDropToField(this.fields[0]);
        this.doDropToField(this.fields[0]);
    }

    getDropColors(dropNumber) {
        while (this.dropColors.length < dropNumber + 1) {
            const drop = [];

            for (let i = 0; i < this.dropSize; i++) {
                drop.push(DROP_COLORS[Math.floor(Math.random() * DROP_COLORS.length)]);
            }

            this.dropColors.push(drop);
        }

        return this.dropColors[dropNumber];
    }

    getDropPositions (dropNumber) {
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
