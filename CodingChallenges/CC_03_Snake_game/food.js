class Food {
  constructor() {
    this.update()
  
  }

  show() {
    fill(color("red"))
    rect(this.pos.x, this.pos.y, unit, unit)
  }

  update() {
    this.pos = createVector(floor(random(cols)), floor(random(rows))).mult(unit)    
  }

}