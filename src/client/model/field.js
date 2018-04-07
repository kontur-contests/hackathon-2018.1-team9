
export default class FieldModel {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cells = [];

        for (let x = 0; x < width; x++) {
            this.cells[x] = [];
            for (let y = 0; y < height; y++) {
                this.cells[x][y] = null;
            }
        }
    }


}
