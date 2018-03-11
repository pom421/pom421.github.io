const idGoogleSheet = "https://docs.google.com/spreadsheets/d/1c5QlP0q_mPQ-s2AVxa0KJFgONELIBrNNzBSHDU8woBI/"
const voices = ["Thomas", "Amelie", "Google français"]
let speech
let rang
let idReplique = 0
let repliques

function setup() {
	noCanvas()
	rang = 0

	Tabletop.init({
		key: idGoogleSheet,
		callback: setData,
		simpleSheet: true
	})

	speech = new p5.Speech()

	speech.onStart = speechStarted
	speech.onEnd = speechEnded

	let stop = createButton("Stop")
	stop.mousePressed(() => {
		speech.cancel()
		idReplique = repliques.length
	})

	let voix1 = createButton("Thomas")
	voix1.mousePressed(() => setVoice(voix1.elt.textContent))

	let voix2 = createButton("Amelie")
	voix2.mousePressed(() => setVoice(voix2.elt.textContent))

	let voix3 = createButton("Google français")
	voix3.mousePressed(() => setVoice(voix3.elt.textContent))

}


function setVoice(voice) {
	debugger
	speech.setVoice(voice)
}

function setData(data, tabletop) {
	repliques = data
	speakReplique()
}

function speakReplique() {
	speech.speak(repliques[idReplique].replique)
	createP(repliques[idReplique].replique)
	idReplique++
}

function speechStarted() {
	console.log("Démarré")
}
function speechEnded() {
	console.log("Fin")

	if (idReplique >= repliques.length) {
		console.log("Fin des répliques")
	} else {
		speakReplique()
	}

}
