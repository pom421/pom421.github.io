class Arena {

    constructor() {
        this.xoffset = 0

        this.ground = Array(NB_ROWS).fill(null)
        for (let row = 0; row < NB_ROWS; row++) {
            this.ground[row] = Array(NB_COLS).fill(null)
            for (let col = 0; col < 1000; col++) {
                this.ground[row][col] = random(0, 100) > 80 ? 250 : 0
            }
        }
    }

    drawArena() {
        background(240);

        for (let row = 0; row < this.ground.length; row++) {
            for (let col = this.xoffset; col < Math.min(this.xoffset + NB_COLS, this.ground[row].length); col++) {
                fill(this.ground[row][col])
                rect((col - this.xoffset) * unit, row * unit, unit, unit)
            }
        }

        this.xoffset++
    }

}