const idGoogleSheet = "https://docs.google.com/spreadsheets/d/1c5QlP0q_mPQ-s2AVxa0KJFgONELIBrNNzBSHDU8woBI/"
const voices = ["Thomas", "Amelie", "Google français"]

let sheet
let select
let run

function setup() {
	noCanvas()
	
	const speech = new p5.Speech()
	select = createSelect()

	sheet = new Sheet(speech, select)

	Tabletop.init({
		key: idGoogleSheet,
		callback: sheet.init.bind(sheet),
		simpleSheet: true
	})

	run = createButton("Lancer")
	run.mousePressed((e) => {
		sheet.toggleRun()
		run.html(run.html() === "Lancer" ? "Pause" : "Lancer")
	})

	let next = createButton("Suivant")
	next.mousePressed(() => {
		sheet.next()
	})
}

function keyPressed() {
	switch (keyCode) {
		case RIGHT_ARROW:
			sheet.skipToNext()
	}
}


