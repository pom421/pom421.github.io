class Player {
    constructor() {

        this.arena = Array(NB_ROWS).fill(null)
        for (let row = 0; row < NB_ROWS; row++) {
            this.arena[row] = Array(NB_COLS).fill(0)
        }
        this.reset()

        this.beginAnimation()
    }

    reset() {
        console.log("Nouvel item")
        this.pickItem()
        this.yoffset = 0
        this.xoffset = 4
    }

    beginAnimation() {
        if (!this.item) {
            this.pickItem()
        }
        setInterval(() => this.offset(1, 0), 1000)
    }

    pickItem() {
        this.item = random(items)
    }

    offset(row, col) {

        console.log("yoffset/xoffset", this.yoffset, this.xoffset)

        const WORKING_ON_ROW = row ? true : false

        let xoffset, yoffset
        if (WORKING_ON_ROW) {
            xoffset = this.xoffset
            yoffset = this.yoffset + row
        } else {
            yoffset = this.yoffset
            xoffset = this.xoffset + col
        }

        const freeSpace = this.isFreeSpace({ arena: this.arena, item: this.item, xoffset, yoffset })

        if (freeSpace) {
            this.xoffset += col
            this.yoffset += row
        } else if (WORKING_ON_ROW) {
            // problème sur l'axe des Y
            this.destroyLines()
            this.mergeArena()
            this.drawArena()
            this.reset()

        } else {
            console.log("Problème sur l'axe des X")
        }

        this.drawArena()
        this.drawItem()
    }

    mergeArena() {
        for (let row = 0; row < this.item.length; row++) {
            for (let col = 0; col < this.item[row].length; col++) {
                if (this.item[row][col]) {
                    // ajout de la couleur dans l'arene
                    this.arena[row + this.yoffset][col + this.xoffset] = this.item[row][col]
                }
            }
        }
    }
    

    drawArena() {
        background(250)

        stroke(color("lightgray"))
        for (let row = 0; row < this.arena.length; row++) {
            for (let col = 0; col < this.arena[row].length; col++) {
                fill(color(colors[this.arena[row][col]]))
                rect(col * unit, row * unit, unit, unit)
            }
        }
    }

    destroyLines() {
        for (let row = 0; row < this.arena.length; row++) {
            let isComplete = true
            for (let col = 0; col < this.arena[row].length; col++) {
                if (!this.arena[row][col]) {
                    isComplete = false
                    break
                }
            }
            if (isComplete) {
                this.arena.splice(row, 1)
                this.arena.unshift(Array(NB_COLS).fill(0))
            }
        }
    }

    drawItem() {
        for (let row = 0; row < this.item.length; row++) {
            for (let col = 0; col < this.item[row].length; col++) {
                if (this.item[row][col]) {
                    fill(color(colors[this.item[row][col]]))
                    rect((col + this.xoffset) * unit, (row + this.yoffset) * unit, unit, unit)
                }
            }
        }
    }


    isFreeSpace({ arena, item, xoffset, yoffset }) {
        for (let row = 0; row < item.length; row++) {
            for (let col = 0; col < item[row].length; col++) {
                // on ne prend que les éléments de l'item non vide (!= 0)
                if (item[row][col]) {
                    // si on dépasse les limtites normales
                    if (row + yoffset > NB_ROWS - 1) {
                        return false
                    } else if ((col + xoffset > NB_COLS - 1) || (col + xoffset < 0)) {
                        return false
                    }
                    // s'il y a déjà un bloc qui est présent là où veut se placer un bout de pièce
                    if (arena[row + yoffset][col + xoffset]) {
                        return false
                    }

                }
            }
        }

        return true
    }

    rotateItem() {

        let res = Array(this.item.length).fill(null)
        for (let row = 0; row < this.item.length; row++) {
            res[row] = Array(this.item.length).fill(null)
        }

        for (let row = 0; row < this.item.length; row++) {
            //this.item[row]
            for (let col = 0; col < this.item[row].length; col++) {
                res[col][this.item.length - 1 - row] = this.item[row][col]
            }
        }

        this.item = res
        this.drawArena()
        this.drawItem()
    }

}