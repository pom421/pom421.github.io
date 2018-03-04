class GridManager {

  constructor({ nb_tiles_h, nb_tiles_v, nb_mines, mode }) {
    if (mode !== "test") {
      this.nb_tiles_h = nb_tiles_h
      this.nb_tiles_v = nb_tiles_v
      this.nb_mines = nb_mines
      this.nb_tiles = nb_tiles_h * nb_tiles_v
    }

    this.grid = []      // get tiles access with coordinates (y, x)
    this.allTiles = []  // get access to all tiles in a list. Useful in certain cases
    this.isGameOver = false
    this.isWon = false
    this.nbFlags = 0
  }

  createGrid() {
    for (let y = 0; y < this.nb_tiles_v; y++) {
      let line = []
      this.grid.push(line)
      for (let x = 0; x < this.nb_tiles_h; x++) {
        let tile = new Tile(x, y)
        this.allTiles.push(tile)
        line.push(tile)
      }
    }
  }

  createGridFromSample(arr) {
    this.nb_mines = 0
    this.nb_tiles_v = arr.length

    for (var y = 0; y < arr.length; y++) {
      let line = []
      this.grid.push(line)
      for (var x = 0; x < arr[y].length; x++) {
        this.nb_tiles_h = arr[y].length
        const tile = new Tile(x, y, arr[y][x])
        this.allTiles.push(tile)
        line.push(tile)

        if (tile.state === "B") {
          this.nb_mines++
        }
      }
    }
    this.nb_tiles = this.nb_tiles_h * this.nb_tiles_v
  }

  addRandomMines() {
    let minesLeft = this.nb_mines

    while (minesLeft > 0) {
      const optionTile = random(this.allTiles)

      if (optionTile.state !== "B") {
        optionTile.state = "B"
        console.log(`Mine en (${optionTile.x}, ${optionTile.y})`)
        minesLeft--
      }
    }
  }

  // end of game, show everything
  revealGrid() {
    this.allTiles.forEach(tile => tile.reveal())
  }

  // show only the square
  showGrid() {
    this.allTiles.forEach(tile => tile.showNeutral())
  }

  countBombsAround() {
    this.allTiles.forEach(tile => {
      if (tile.state !== "B") {
        const neighbours = this.getAllNeighbours(tile.x, tile.y)
        const nbMines = neighbours.reduce((acc, tile) => tile.state === "B" ? acc + 1 : acc, 0)
        tile.state = nbMines ? nbMines : tile.state
      }
    })
  }

  getAllNeighbours(tileX, tileY) {
    let arr = []

    let arrX = Array(3).fill()
      .map((elt, index) => index - 1)
      .map((elt) => tileX + elt)
      .filter(elt => elt >= 0 && elt < this.nb_tiles_h)

    let arrY = Array(3).fill()
      .map((elt, index) => index - 1)
      .map((elt) => tileY + elt)
      .filter(elt => elt >= 0 && elt < this.nb_tiles_v)

    for (let y = 0; y < arrY.length; y++) {
      for (let x = 0; x < arrX.length; x++) {
        if (arrX[x] !== tileX || arrY[y] !== tileY) {
          arr.push(this.grid[arrY[y]][arrX[x]])

        }
      }
    }

    return arr
  }

  checkCoordinates(x, y) {

    if (x < 0 || x >= this.nb_tiles_h) {
      return false
    }
    if (y < 0 || y >= this.nb_tiles_v) {
      return false
    }
    return true
  }

  revealTile(x, y) {

    if (this.checkCoordinates(x, y)) {
      this.runChrono()
      let tile = this.grid[y][x]
      tile.reveal()

      if (tile.state === "B") {
        this.isGameOver = true
        this.revealGrid()
        tile.emphasize()
      } else if (tile.state === "") {
        this.revealAdjacentTiles(x, y)
      }

      if (this.countRevealedTiles() + this.nb_mines === this.nb_tiles) {
        this.isWon = true
        this.revealGrid()
      }

    }

  }

  countRevealedTiles() {
    return this.allTiles.reduce((acc, tile) => tile.revealed ? acc + 1 : acc, 0)
  }

  revealAdjacentTiles(x, y) {

    const neighbours = this.getAllNeighbours(x, y)

    neighbours.forEach(
      elt => this.revealTileIfNoBomb(elt.x, elt.y)
    )

  }

  revealTileIfNoBomb(x, y) {

    const tile = this.grid[y][x]

    if (tile.state !== "B" && !tile.revealed) {

      tile.reveal()

      if (tile.state === "") {
        this.revealAdjacentTiles(x, y)

      }
    }
  }

  toggleFlag(x, y) {
    if (this.checkCoordinates(x, y)) {
      this.runChrono()
      this.nbFlags = this.nbFlags + this.grid[y][x].toggleFlag()
    }
  }

  runChrono() {
    const displayTime = () => {
      let elapsed = Math.round((new Date() - this.startTime) / 1000)
      document.getElementById("timer").innerHTML = elapsed + " seconds"
    }

    if (!this.startTime) {
      this.startTime = new Date()
      displayTime()

      setInterval(() => {
        if (!this.isGameOver && !this.isWon) {
          displayTime()
        }
      }, 1000)


    }
  }
}