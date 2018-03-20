const NB_ROWS = 20
const NB_COLS = 10
let unit
let score = 0
let arena
let player

const sketch1 = function(p) {
  p.setup = function() {
    p.createCanvas(301, 601)
  
    unit = Math.floor(p.width / NB_COLS)
  
    player = new Player(p)
  }
  
  p.draw = function() {

  }

  p.keyPressed = function() {
    console.log("keypressed", p.keyCode)
    switch (p.keyCode) {
      case p.UP_ARROW:
        player.rotateItem()
        break
      case p.LEFT_ARROW:
        player.offset(0, -1)
        break
      case p.RIGHT_ARROW:
        player.offset(0, 1)
        break
      case p.DOWN_ARROW:
        player.offset(1, 0)
        break
      case p.TAB:
        console.table(player.arena)
        break
      case 80:
        player.togglePause()
  
    }
  
    console.table(player.item)
  }
  

}

new p5(sketch1, "gameDiv")

const sketch2 = function(p) {
  p.setup = function() {
    p.createCanvas(301, 601)
  }
  
  p.draw = function() {
    p.background(250)
    p.textAlign(p.CENTER)
    p.textSize(32)
    p.fill(p.color("red"));
    p.text("Score", p.width / 2, 40)
    p.textSize(26)
    p.text("400", p.width / 2, 80)
    p.fill(p.color("blue"));
    p.textSize(32)
    p.text("Niveau", p.width / 2, 140)
    p.textSize(26)
    p.text("10", p.width / 2, 180)
  }

}


new p5(sketch2, "scoreDiv")


const sketch3 = function(p) {
  p.setup = function() {
    p.createCanvas(602, 601)
  }
  
  p.draw = function() {
    p.background(p.color("yellow"))
  }

}


new p5(sketch3, "nextPieceDiv")


