class Snake {
  constructor() {
    this.tail = []
    this.tail.push(createVector(0, 0))
    this.speed = createVector(0, 0)
  }

  update() {
    if (this.growing) {
      debugger
      this.tail.push("vector to add")
      this.growing = false
    }
    
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i] = this.tail[i - 1]
    }
    
    this.tail[0] = this.tail[0].copy().add(this.speed)
    this.tail[0].x = constrain(this.tail[0].x, 0, width - unit)
    this.tail[0].y = constrain(this.tail[0].y, 0, height - unit)

  }

  dir(dirX, dirY) {
    this.speed = createVector(dirX, dirY).mult(unit)
  }

  show() {
    fill(200)
    this.tail.forEach(elt => {
      rect(elt.x, elt.y, unit, unit)
    })
    
  }

  isEating(food) {
    const distance = this.tail[0].dist(food.pos)
    return this.growing = distance < 1
  }

  isColliding() {

    if (this.tail[0].x >= width || this.tail[0].x < 0 || 
      this.tail[0].y >= height || this.tail[0].y < 0) {
        return true
      }

    for (var i = 1; i < this.tail.length; i++) {
      if (this.tail[0].dist(this.tail[i]) === 0) {
        return true
      }
    }
    return false
  }
}