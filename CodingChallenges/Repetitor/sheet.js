const DURATION = 4000
const colors = ["red", "orange", "green", "violet", "magenta", "marroon", "blue", "yellow"]

const getCharacters = data => {
    let res = {}
    let color = 0

    data.map(elt => elt.character)
        .forEach(character => {
            if (!res[character]) {
                res[character] = colors[color++]
            }
        })

    return res

}

class Sheet {

    constructor(speech, select) {
        this.speech = speech
        this.select = select

        this.pause = true

        speech.onStart = this.speechStarted.bind(this)
        speech.onEnd = this.speechEnded.bind(this)

        speech.setRate(1.2)

    }

    speechStarted() {
        console.log("Démarré")
    }

    speechEnded() {
        console.log("Fin")

        if (this.id >= this.data.length) {
            console.log("Fin des répliques")
        } else if (this.pause) {
            console.log("En pause")
        } else {
            this.speakNext()
        }
    }

    init(data, tabletop) {
        this.data = data
        this.tabletop = tabletop
        this.id = 0
        this.characters = getCharacters(this.data)

        for (let character in this.characters) {
            this.select.option(character)
        }

        this.select.changed(this.characterChoice.bind(this))
    }

    characterChoice() {

        this.character = this.select.value()
    }

    toggleRun() {
        if (this.pause) {
            this.pause = false
            if (this.id < this.data.length) {
                this.speakNext()

            }
        } else {
            this.pause = true

        }
    }

    skipToNext() {
        this.speech.cancel()
    }

    speakNext() {

        console.log("id", this.id, "(" + this.data.length + ")")
        const character = this.data[this.id].character

        if (character === this.character) {
            let starter = `<span style="padding: 0 10px; color:${this.characters[character]}">${character}</span> :`
            let p = createP(starter + "  ").show()
            this.toggleRun()

            let progress = (percentage) => `<div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%"></div>
                </div>`
                
            const animationPace = 16
            const duration = this.data[this.id].duration ? this.data[this.id].duration * 1000 : DURATION
            let percentage = 0
            let lap = 0
            const nbLaps = (duration / animationPace) * lap
            let html = `${starter} ${this.data[this.id].sentence}`
            
            const idInterval = setInterval(() => {
                lap++
                percentage = animationPace * lap / duration * 100
                console.log("lap/percentage", lap, percentage)
                p.html(progress(percentage))
                if (percentage >= 100) {
                    this.reveal.bind(this, p, html, idInterval)()
                }
            }, animationPace)

        } else {
            createP(`<span style="padding: 0 10px; color:${this.characters[character]}">${character}</span> : ${this.data[this.id].sentence}`)
            this.speech.speak(this.data[this.id].sentence)
            this.id++

        }
    }

    /**
     * Révèle la phrase cachée
     * 
     * @param {*} paragraph 
     * @param {*} html 
     */
    reveal(paragraph, html, idInterval) {
        clearInterval(idInterval)
        this.id++
        paragraph.html(html)
        this.toggleRun()
    }

}