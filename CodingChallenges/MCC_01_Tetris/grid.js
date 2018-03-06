const eraseLayer = layer => {
    for (let i = 0; i < layer.length; i++) {
        for (let j = 0; j < layer[i].length; j++) {
            layer[i][j] = null
        }
    }
}

class Arena {

    constructor() {
        // layer du passé
        this.staticLayer = Array(20)
        for (var row = 0; row < 20; row++) {
            this.staticLayer[row] = new Array(10).fill(null)
        }
        // layer pour l'item en cours qui bouge
        this.dynamicLayer = Array(20)
        for (var row = 0; row < 20; row++) {
            this.dynamicLayer[row] = new Array(10).fill(null)
        }
        // la fusion des 2 pour l'affichage
        this.workingLayer = Array(20)
        for (var row = 0; row < 20; row++) {
            this.workingLayer[row] = new Array(10).fill(null)
        }

        this.colOffset = null

        this.middle = floor(cols / 2) - 1
    }

    debug() {
        for (let i = 0; i <= rows; i++) {
            stroke(126);
            fill(color("black"))
            line(0, i * unit, width, i * unit)
        }
        for (let i = 0; i <= cols; i++) {
            stroke(126);
            fill(color("black"))
            line(i * unit, 0, i * unit, height)
        }
    }

    pickItem() {
        this.currentItem = random(items)
        //this.currentItem = items.filter(item => item.name === "THREE")[0]
        this.rowOffset = 19
        this.colOffset = this.middle

        getCoord(this.currentItem).forEach(coord => {
            this.dynamicLayer[coord.row][coord.col + this.colOffset] = this.currentItem.color
        })

    }

    dir(x, y) {
        if (x === 1) {
            for (let row = 0; row < 20; row++) {
                for (let col = 9; col >= 1; col--) {
                    this.dynamicLayer[row][col] = this.dynamicLayer[row][col - 1]
                }
                this.dynamicLayer[row][0] = null
            }
        } else if (x === -1) {
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 9; col++) {
                    this.dynamicLayer[row][col] = this.dynamicLayer[row][col + 1]
                }
                this.dynamicLayer[row][9] = null
            }
        } else if (y === 1) {
            this.dropItem()
        }
        console.log(this.dynamicLayer)
    }

    mergeLayers() {
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                this.workingLayer[row][col] = this.staticLayer[row][col] || this.dynamicLayer[row][col]
            }
        }
        return this.workingLayer
    }

    // mise à jour de l'élément courant
    update() {

        eraseLayer(this.workingLayer)
        //eraseLayer(this.dynamicLayer)

        if (!this.currentItem) {
            this.pickItem()
        }

        this.dropItem()

        this.workingLayer = this.mergeLayers()
        this.showContent()
    }

    dropItem() {
        if (this.rowOffset > 0) {
            this.dynamicLayer.unshift([null, null, null, null, null, null, null, null, null, null])
            this.dynamicLayer.pop()
        }

        this.rowOffset--

    }

    showContent() {
        this.debug()
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                if (this.workingLayer[row][col]) {
                    fill(color(this.workingLayer[row][col]))
                    rect(col * unit, row * unit, unit, unit)
                }
            }
        }
    }


}

