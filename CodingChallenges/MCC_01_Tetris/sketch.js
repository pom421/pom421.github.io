let unit = 20
let cols = 10, rows = 20
let score = 0
let arena
let player

function setup() {
  createCanvas(400, 600)
  player = new Player()
  
  player.pickItem()
  player.begin()
}

function draw() {

  //arena.debug()
}

function keyPressed() {
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

  }
  
  console.table(player.item)
}
