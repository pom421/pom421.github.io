class Matrix {
  constructor(rows, cols) {
    this.cols = cols
    this.rows = rows
    this.data = Array(rows).fill(null)
    for (let row = 0; row < rows; row++) {
      this.data[row] = Array(cols).fill(null)
    }
  }

  randomize() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.data[row][col] = Math.floor(Math.random() * 10)
      }
    }
  }
  
  static print(matrix) {
    console.table(matrix.data)
  }

  static add(m1, m2) {
    if (m1.cols !== m2.cols || m1.rows !== m2.rows) {
      throw new Error("add impossible entre des matrices qui n'ont pas les mêmes dimensions")
    } 

    let res = new Matrix(m1.rows, m1.cols)

    for (let row = 0; row <  m1.rows; row++) {
      for (let col = 0; col < m1.cols; col++) {
        res.data[row][col] = m1.data[row][col] + m2.data[row][col]
      }
    }

    return res
  }

  static sub(m1, m2) {
    if (m1.cols !== m2.cols || m1.rows !== m2.rows) {
      throw new Error("add impossible entre des matrices qui n'ont pas les mêmes dimensions")
    } 

    let res = new Matrix(m1.rows, m1.cols)

    for (let row = 0; row <  m1.rows; row++) {
      for (let col = 0; col < m1.cols; col++) {
        res.data[row][col] = m1.data[row][col] - m2.data[row][col]
      }
    }

    return res
  }

  transpose() {
    let res = new Matrix(this.cols, this.rows)

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        
        res.data[col][this.rows - 1 - row] = this.data[row][col]
      }
    }
    this.data = res.data
  }
}

let m1 = new Matrix(3, 2)
m1.randomize()

let m2 = new Matrix(3, 2)
m2.randomize()

Matrix.print(m1)
//Matrix.print(m2)

let m3 = Matrix.add(m1, m2)
//Matrix.print(m3)

//m3.transpose()
m1.transpose()

Matrix.print(m1)

