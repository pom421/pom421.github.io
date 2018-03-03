let unit = 20
let cols, rows
let snake
let food
let score = 0

function setup() {
  createCanvas(400, 400)
  cols = width / unit
  rows = height / unit
  frameRate(10)
  snake = new Snake()
  food = new Food()
}

function draw() {
  background(240);
  
  if (snake.isEating(food)) {
    document.getElementById("score").innerHTML = ++score
    food.update()
  }

  snake.update()
  
  if (snake.isColliding()) {
    document.getElementById("status").innerHTML = "Game Over"
    document.getElementById("status").style.visibility = "visible"
    noLoop()
  }
  food.show()
  snake.show()
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0)
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0)
  } else if (keyCode === UP_ARROW) {
    snake.dir(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1)
  }

}