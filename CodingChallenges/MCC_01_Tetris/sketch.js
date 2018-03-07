const NB_ROWS = 20
const NB_COLS = 10
let unit
let score = 0
let arena
let player

function setup() {
  createCanvas(301, 601)

  unit = Math.floor(width / NB_COLS)

  player = new Player()
}

function draw() {

  //arena.debug()
}

function keyPressed() {
  console.log("keypressed")
  switch (keyCode) {
    case UP_ARROW:
      player.rotateItem()
      break
    case LEFT_ARROW:
      player.offset(0, -1)
      break
    case RIGHT_ARROW:
      player.offset(0, 1)
      break
    case DOWN_ARROW:
      player.offset(1, 0)
      break
    case TAB:
      console.table(player.arena)

  }

  console.table(player.item)
}
