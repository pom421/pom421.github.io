const NB_ROWS = 20
const NB_COLS = 10
let unit
let score = 0
let arena
let player
let myThrottle


function throttle(fn, period) {
  let lastRun = + new Date()

  return function () {
    let now = +new Date()

    if (now - lastRun > period) {
      fn.apply(player)
      lastRun = now
    }
  }
}

function setup() {
  createCanvas(601, 601)

  unit = Math.floor(301 / NB_COLS)

  player = new Player()
  myThrottle = throttle(player.checkDownKeys, 60)

}

function draw() {
  console.log("draw")
  myThrottle()
}

function keyPressed() {
  console.log("keypressed", keyCode)
  switch (keyCode) {
    case UP_ARROW:
      player.rotateItem()
      console.log("UP")
      break
    case TAB:
      console.table(player.arena)
      break
    case 80:
      player.togglePause()

  }

  //console.table(player.item)
}
