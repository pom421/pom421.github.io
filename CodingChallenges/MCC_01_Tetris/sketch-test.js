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
  player.rotateItem()
  
  console.table(player.item)
}