class Snake {
  constructor() {
    this.headX = 0
    this.headY = 0
    this.points = []
    this.size = 20
    this.direction = null
    this.idTimeout = null
  }

  show() {
    fill(200)
    rect(this.headX, this.headY, this.size, this.size)
  }

  go(direction) {
    clearTimeout(this.idTimeout)

    switch (direction) {
      case "LEFT":
        this.headX = this.headX - 10 >= 0 ? this.headX - 10 : this.headX
        this.idTimeout = setTimeout(() => this.go("LEFT"), 100)
        break
      case "RIGHT":
        this.headX = this.headX + this.size + 10 < width ? this.headX + 10 : this.headX
        this.idTimeout = setTimeout(() => this.go("RIGHT"), 100)
        break
      case "UP":
        this.headY = this.headY - 10 >= 0 ? this.headY - 10 : this.headY
        this.idTimeout = setTimeout(() => this.go("UP"), 100)
        break
      case "DOWN":
        this.headY = this.headY + this.size + 10 < height ? this.headY + 10 : this.headY
        this.idTimeout = setTimeout(() => this.go("DOWN"), 100)
        break
    }
  }

}