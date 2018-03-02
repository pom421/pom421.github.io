let snake

function setup() {
  createCanvas(200, 200)

  snake = new Snake()
}

function draw() {
  background(240);

  snake.show()
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.go("LEFT")
  } else if (keyCode === RIGHT_ARROW) {
    snake.go("RIGHT")
  } else if (keyCode === UP_ARROW) {
    snake.go("UP")
  } else if (keyCode === DOWN_ARROW) {
    snake.go("DOWN")
  }

}