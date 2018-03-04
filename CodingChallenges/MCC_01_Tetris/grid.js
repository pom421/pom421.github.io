class Grid {

    constructor() {
        this.content = Array(20)
        
        
        for (var row = 0; row < 20; row++) {
            this.content[row] = new Array(10).fill(null)
        }

        this.middle = floor(cols / 2) - 1
        this.xoffset = null
        this.yoffset = null
        this.currentItem = this.pickItem()
    }

    show() {
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
        // random(items)
        this.currentItem = items.filter(item => item.name === "THREE")[0]

        this.xoffset = this.middle
        this.yoffset = 0

        this.posCurrentItem = this.currentItem.scheme1.map(coord => [ coord[0] + this.xoffset, coord[1 + this.yoffset]])

        this.addItem()

    }

    addItem() {
        this.posCurrentItem.forEach(coord => {
            this.content[coord[1]][coord[0]] = this.currentItem.color
            console.table(this.content)
        })
    }

    dir(x, y) {
        this.pos.x = this.pos.x + x
        this.pos.y = this.pos.y + y
    }

    // mise à jour de l'élément courant
    update() {

        let size = this.currentItem.scheme.length
        fill(color(this.currentItem.color))
        // pos = floor(cols / 2), 0
        for (var i = 0; i < this.currentItem.scheme.length; i++) {
            for (var j = 0; j < this.currentItem.scheme[i].length; j++) {
                if (this.currentItem.scheme[i][j] === 1) {
                    this.content(this.pos.x + j, this.pos.y + i)
                }
            }
        }
    }

    showContent() {
        for (let row = 0; row < this.content.length; row++) {
            for (let col = 0; col < this.content[row]; col++) {
                if (this.content[row][col]) {
                    fill(color(this.content[row][col]))
                    rect(col * unit, row * unit, unit, unit)
                }
            }
        }
    }


}

