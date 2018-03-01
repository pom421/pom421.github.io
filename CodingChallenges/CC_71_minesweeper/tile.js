class Tile {
  constructor(x, y, state) {
    this.x = x
    this.y = y
    this.state = state === "B" ? "B" : "" // "" or "B" or a number of bombs around)
    this.revealed = false
    this.flag = false
  }

  showNeutral() {
    fill(255)
    rect(this.x * SIZE_TILE, this.y * SIZE_TILE, SIZE_TILE, SIZE_TILE)
  }

  reveal() {
    fill(220)
    rect(this.x * SIZE_TILE, this.y * SIZE_TILE, SIZE_TILE, SIZE_TILE)
    fill(0)
    textSize(12)
    textAlign(CENTER, CENTER)
    if (this.state === "B") {
      fill(color("magenta"))
    }
    text(this.state, this.x * SIZE_TILE + SIZE_TILE / 2, this.y * SIZE_TILE + SIZE_TILE / 2)
    this.revealed = true
  }

  toggleFlag() {
    this.flag = !this.flag

    if (this.flag) {
      textSize(12)
      textAlign(CENTER, CENTER)
      fill(color("blue"))

      text("?", this.x * SIZE_TILE + SIZE_TILE / 2, this.y * SIZE_TILE + SIZE_TILE / 2)
      return 1
    } else {
      this.showNeutral()
      return -1
    }

  }

  emphasize() {
    textSize(12)
    textAlign(CENTER, CENTER)
    fill(color("magenta"))
    rect(this.x * SIZE_TILE, this.y * SIZE_TILE, SIZE_TILE, SIZE_TILE)
    fill(color("white"))
    text(this.state, this.x * SIZE_TILE + SIZE_TILE / 2, this.y * SIZE_TILE + SIZE_TILE / 2)

  }

}
