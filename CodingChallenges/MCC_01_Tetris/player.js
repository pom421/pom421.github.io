class Player {
    constructor() {
        this.xoffset = 4
        this.yoffset = 0
        this.item
        this.arena = Array(20).fill(null)

        for (let row = 0; row < 20; row++) {
            this.arena[row] = Array(10).fill(0)
        }
    }

    begin() {
        if (!this.item) {
            this.pickItem()
        }
        setInterval(() => this.offset(1, 0), 1000)
    }

    pickItem() {
        this.item = random(items).matrix
    }

    drawItem() {
        background(250)

        noStroke()
        for (let row = 0; row < this.item.length; row++) {
            for (let col = 0; col < this.item[row].length; col++) {
                fill(color(colors[this.item[row][col]]))
                rect((col + this.xoffset) * unit, (row + this.yoffset) * unit, unit, unit)

            }
        }
    }

    offset(row, col) {

        const freeSpace = this.isFreeSpace({ arena: this.arena, item: this.item, xoffset: this.xoffset, yoffset: this.yoffset })

        if (freeSpace === "OK") {
            this.xoffset += col
            this.yoffset += row
        } else if (freeSpace === "Y") {
            // problème sur l'axe des Y
            this.mergeArena()
            this.pickItem()
            this.yoffset = 0
        } else if (freeSpace === "X") {
            console.log("Problème sur l'axe des X")
        }
        this.drawItem()
    }

    mergeArena() {
        for (let row = 0; row < item.length; row++) {
            for (let col = 0; col < item[row].length; col++) {
                if (item[row][col]) {
                    // ajout de la couleur dans l'arene
                    arena[row + this.yoffset][col + this.xoffset] = this.item[row][col]
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
                    if (row + yoffset < 0 ) {
                        return "Y"
                    } else if (col + xoffset > 9 ||  col.xoffset < 0) {
                        return "X"
                    }
                    // s'il y a déjà un bloc qui est présent là où veut se placer un bout de pièce
                    if (arena[row + yoffset][col + xoffset] !== 0) {
                        return "Y" // TODO??
                    }

                }
            }
        }

        return "OK"
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