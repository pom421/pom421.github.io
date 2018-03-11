let arena
let unit
const NB_ROWS = 60
const NB_COLS = 400

function setup() {
  createCanvas(400, 600)
  unit = height / NB_ROWS
  arena = new Arena(unit)
}


function draw() {
  arena.drawArena()
}

function mouseChecked() {

}