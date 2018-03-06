class Player {
    constructor() {
        this.xoffset = 4
        this.yoffset = 0
        this.item
    }

    begin() {
        if (!this.item) {
            this.pickItem()
        }
        setInterval(this.isFallComplete.bind(this), 1000)
    }

    pickItem() {
        this.item = random(items).matrix
    }

    drawItem() {
        background(250)

        for (let row = 0; row < this.item.length; row++) {
            for (let col = 0; col < this.item[row].length; col++) {
                noStroke()
                fill(color(colors[this.item[row][col]]))
                rect((col + this.xoffset) * unit, (row + this.yoffset) * unit , unit, unit)
            }
        }
    }

    isFallComplete() {
        if (this.yoffset > 20) {
            this.pickItem()
            this.yoffset = 0
        }
        this.offset(1, 0)
    }

    offset(row, col) {
        const { minCol, maxCol, maxRow } = this.getDimensionItem()
        this.xoffset += col
        this.yoffset += row
        this.drawItem()
    }

    getDimensionItem() {
        let minCol, maxCol, maxRow
        let matrix = this.item

        this.rotateItem()

        let emptyCol = 0
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col]) {
                    emptyCol = row
                    break
                }
            }
            if (emptyCol) {
                break
            }
        }
    } 

    rotateItem() {
        let matrix = this.item
        let res = Array(matrix.length).fill(null)
        for (let row = 0; row < matrix.length; row++) {
            res[row] = Array(matrix.length).fill(null)
        }

        for (let row = 0; row < matrix.length; row++) {
            //matrix[row]
            for (let col = 0; col < matrix[row].length; col++) {
                res[col][matrix.length - 1 - row] = matrix[row][col]
            }
        }

        this.item = res
        this.drawItem()
    }
}