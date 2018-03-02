var NB_COLS = NB_ROWS = 4,
    SIZE = 100

let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

function setup() {

    createCanvas(401, 401)

    placeNumber()
}

function draw() {
    for (let row = 0; row < NB_ROWS; row++) {
        for (let col = 0; col < NB_COLS; col++) {
            stroke(51)
            rect(row * SIZE, col * SIZE, SIZE, SIZE)
            refreshGrid()
            
        }
    }

}

function keyPressed(){
    if (keyCode === LEFT_ARROW) {
        console.log("LEFT")
        swipe("LEFT")
    } else if (keyCode === RIGHT_ARROW) {
        console.log("RIGTH")
        swipe("RIGHT")
        
    } else if (keyCode === UP_ARROW) {
        console.log("UP")
        swipe("UP")
    } else if (keyCode === DOWN_ARROW) {
        console.log("DOWN")
        swipe("DOWN")
    }
}

function placeNumber() {

    let options = []

    for (let row = 0; row < NB_ROWS; row++) {
        for (let col = 0; col < NB_COLS; col++) {
            if (!grid[row][col]) {
                options.push({
                    row, col 
                })
            }
        }
    }

    if (!options.length) {
        return false       
    }

    const cell = random(options)
    const value = random(1) > 0.5 ? 4 : 2   
    
    grid[cell.row][cell.col] = value

    return true

}

function refreshGrid() {
    for (let row = 0; row < NB_ROWS; row++) {
        for (let col = 0; col < NB_COLS; col++) {
            textSize(64)
            textAlign(CENTER, CENTER)
            text(grid[row][col], col * SIZE + SIZE / 2, row * SIZE + SIZE /2)
        }}
}

function combine(direction, arr) {
    debugger
    // RIGHT
    if (direction === "RIGHT") {
        for (let i = 3; i > 0; i--) {
            if (arr[i] === arr[i - 1]) {
                arr[i] = 2 * arr[i]
                arr[i - 1] = 0
                i--
            }
        }

    } else if (direction === "LEFT") {
        for (let i = 0; i < 3; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] = 2 * arr[i]
                arr[i + 1] = 0
                i++
            }
        }

    }
    return arr
}

function shift(direction, arr) {

    const arrWoZero = arr.filter(n => n)
    const nbZeros = arr.length - arrWoZero.length
    switch (direction) {
        case "LEFT": 
            return arrWoZero.concat(Array(nbZeros).fill(0))
        case "RIGHT": 
            return Array(nbZeros).fill(0).concat(arrWoZero)
    }
    
}

// apply a permutation on the matrix. The rows become the cols (quarter turn clockwise)
// Thus we can use the same pattern than the LEFT/RIGHT directions for the UP/DOWN directions
function turnColInRow() {
    let gridTurned = [
        [],
        [],
        [],
        []
    ]

    for (let row = 0; row < NB_ROWS; row++) {
        for (let col = 0; col < NB_COLS; col++) {
            // row devient le complémentaire en colonne (3 -> 0, 2 -> 1, etc..)
            // col devient row
            gridTurned[col][3-row] = grid[row][col]
        }
    }
    grid = gridTurned
}

function unturnColInRow() {
    let gridTurned = [
        [],
        [],
        [],
        []
    ]

    for (let row = 0; row < NB_ROWS; row++) {
        for (let col = 0; col < NB_COLS; col++) {
            // row devient le complémentaire en colonne (3 -> 0, 2 -> 1, etc..)
            // col devient row
            gridTurned[3 - col][row] = grid[row][col]
        }
    }
    grid = gridTurned
}

function swipe(direction){ 
    let newDirection = direction

    if (direction ==="UP") {
        turnColInRow()
        newDirection = "RIGHT"
        
    } else if (direction === "DOWN") {
        turnColInRow()
        newDirection = "LEFT"

    }

    for (let row = 0; row < NB_ROWS; row++) {
        grid[row] = shift(newDirection, combine(newDirection, shift(newDirection, grid[row])))
    }

    if (direction === "UP" || direction === "DOWN") {
        unturnColInRow()
    }

    placeNumber()
}
