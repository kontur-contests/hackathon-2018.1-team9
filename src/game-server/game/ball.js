const COLORS = {
    RED: "RED",
    GREEN: "GREEN",
    BLUE: "BLUE",
    YELLOW: "YELLOW",
    MAGENTA: "MAGENTA",
    CYAN: "CYAN",
    RAINBOW: "RAINBOW",
    BLACK: "BLACK"
};

class Ball {
    constructor(color) {
        this.color = color;
    }

    isComporable(color) {
        return this.color !== COLORS.BLACK
            && color !== COLORS.BLACK
            && (this.color === color || this.color === COLORS.RAINBOW || color === COLORS.RAINBOW)
    }

    isDestroydable() {
        return this.color !== COLORS.BLACK;
    }

    isMoveable() {
        return true;
    }
}

module.exports = {
    Ball,
    COLORS
};
