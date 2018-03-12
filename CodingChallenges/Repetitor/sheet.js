const colors = ["red", "orange", "green", "violet", "magenta", "marroon", "blue", "yellow"]

const getPersonnages = data => {
    let res = {}
    let color = 0

    data.map(replique => replique.personnage)
        .forEach(personnage => {
            if (!res[personnage]) {
                res[personnage] = colors[color++]
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

        if (this.idReplique >= this.repliques.length) {
            console.log("Fin des répliques")
        } else if (this.pause) {
            console.log("En pause")
        } else {
            this.speakNextReplique()
        }
    }

    init(data, tabletop) {
        this.repliques = data
        this.tabletop = tabletop
        this.idReplique = 0
        this.personnages = getPersonnages(this.repliques)

        for (let personnage in this.personnages) {
            this.select.option(personnage)
        }

        this.select.changed(this.choixPersonnage.bind(this))
    }

    choixPersonnage() {

        this.personnage = this.select.value()
    }

    toggleRun() {
        if (this.pause) {
            this.pause = false
            this.speakNextReplique()
        } else {
            this.pause = true

        }
    }

    skipToNext() {
        this.speech.cancel()
    }

    speakNextReplique() {
        console.log("idReplique", this.idReplique, "(" + this.repliques.length + ")")
        const personnage = this.repliques[this.idReplique].personnage

        if (personnage === this.personnage) {
            let p = createP(`<span style="padding: 0 10px; color:${this.personnages[personnage]}">${personnage}</span> : ------------------------------------------`).show()
            this.toggleRun()
            const phrase = `<span style="padding: 0 10px; color:${this.personnages[personnage]}">${personnage}</span> : ${this.repliques[this.idReplique].phrase}`
            setTimeout(this.reveal.bind(this, p, 
                (function(phrase) {
                    return phrase
                })(phrase)), 4000)
            
        } else {
            createP(`<span style="padding: 0 10px; color:${this.personnages[personnage]}">${personnage}</span> : ${this.repliques[this.idReplique].phrase}`)
            this.speech.speak(this.repliques[this.idReplique].phrase)
            
        }
        this.idReplique++
        
    }
    
    reveal(paragraph, replique) {
        paragraph.html(replique)
        this.toggleRun()
    }

}