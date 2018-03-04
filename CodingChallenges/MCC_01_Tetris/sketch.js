let unit = 20
let cols = 10, rows = 20
let score = 0
let grid

function setup() {
  createCanvas(201, 401)
  grid = new Grid()
  setInterval(() => {
    grid.update()
  }, 1000)
}

function draw() {
  background(250)

  grid.show()
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      grid.dir(-1, 0)
      break
    case RIGHT_ARROW:
      grid.dir(1, 0)
      break
    case DOWN_ARROW:
      grid.dir(0, 1)
      break
  }
}

