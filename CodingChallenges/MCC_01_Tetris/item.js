const items = [
    {
        name: "THREE",
        scheme: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        scheme1: [
            [1, 0], [0, 1], [1, 1], [2, 1]
        ],
        scheme2: [
            [0, 0], [0, 1], [1, 1], [2, 0]
        ],
        color: "black"
    },
    {
        name: "SQUARE",
        scheme: [
            [1, 1],
            [1, 1]
        ],
        color: "red"
    },
    {
        name: "LINE",
        scheme: [
            [1],
            [1],
            [1],
            [1]
        ],
        color: "blue"
    },
    {
        name: "S1",
        scheme: [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ],
        color: "orange"
    },
    {
        name: "S2",
        scheme: [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ],
        color: "purple"
    },
    {
        name: "L1",
        scheme: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        color: "magenta"
    },
    {
        name: "L2",
        scheme: [
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 1]
        ],
        color: "green"
    }
]

// renvoie les coordonnées des points à dessiner
const getCoord = (item) => {
    let arr = []
    for (let row = 0; row < item.scheme.length; row++) {
        for (let col = 0; col < item.scheme[row].length; col++) {
            console.log("row col", row, col)
            if (item.scheme[row][col]) {
                arr.push({ col, row })

            }
        }
    }
    return arr
}
