let manager

function setup() {
  createCanvas(1500, 1000)

  // lancement en mode test
  if (typeof gridSample !== "undefined") {
    manager = new GridManager({ mode: "test" })
    manager.createGridFromSample(gridSample)
  } else {
    // partie normale
    manager = new GridManager({
      nb_tiles_h: NB_TILES_H,
      nb_tiles_v: NB_TILES_V,
      nb_mines: NB_MINES
    })
    manager.createGrid()
    manager.addRandomMines()
  }

  manager.countBombsAround()
  manager.showGrid()

  //manager.revealGrid()

  document.getElementById("nb-mines").innerHTML = manager.nb_mines
}

function draw() {

}

function mousePressed() {
  if (!manager.isGameOver) {
    const x = Math.ceil(mouseX / SIZE_TILE) - 1
    const y = Math.ceil(mouseY / SIZE_TILE) - 1

    if (keyIsPressed) {
      manager.toggleFlag(x, y)
      document.getElementById("nb-flags").innerHTML = manager.nbFlags
    } else {
      manager.revealTile(x, y)

      if (manager.isGameOver) {
        document.getElementById("status").innerHTML = "Boum !"
        document.getElementById("status").style.color = "red"
      } else if (manager.isWon) {
        document.getElementById("status").innerHTML = "Gagné !"
        document.getElementById("status").style.color = "green"

      }

    }

  }
}
