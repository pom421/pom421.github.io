import React, { Component } from 'react';
import "./Carrousel.css"

class Timer {
  constructor({ duration, callback }) {
    this.duration = duration
    this.callback = callback
    this.progress = 0
  }

  start = () => {
    if (!this.id) {
      this.start = Date.now()
      this.id = setInterval(() => {
        this.callback()
        this.start = Date.now()
      }, this.duration)
      requestAnimationFrame(this.watchProgress)
    }
  }

  isRunning = () => !!this.id

  stop = () => {
    if (this.id) {
      clearInterval(this.id)
      this.id = null
    }
  }

  reset = () => {
    this.stop()
    this.start()
  }

  watchProgress = () => {
    const now = Date.now()
    this.progress = ((now - this.start) / this.duration) * 100

    requestAnimationFrame(this.watchProgress)
  }

  getProgress = () => {
    return this.progress
  }
}

class Jauge extends Component {

  render() {

    const arg = this.props.progress + "px"

    console.log("dans render", arg);

    return (
      <div style={{ width: arg, height: 1, backgroundColor: "red" }}>toto</div>
    )
  }
}

class Carrousel extends Component {

  state = {
    id: 0,
  }

  componentDidMount() {
    if (this.props.photos) {
      this.photosSize = this.props.photos.length
    }

    this.timer = new Timer({
      duration: 2000,
      callback: () => {
        this.setState(prevState => {

          return {
            id: this.nextId(prevState)
          }
        })
      }
    })

    this.runToggleCarrousel(this.timer)

    document.addEventListener("keypress", this.handleKey)
    document.addEventListener("keydown", this.handleKeyDown)
  }

  handleKey = (event) => {
    console.log("key", event.key)

    if (event.key === " " || "Spacebar") {
      this.runToggleCarrousel()
    }
  }

  handleKeyDown = (event) => {

    if (event.key === "ArrowRight") {
      this.nextPhoto()
    } else if (event.key === "ArrowLeft") {
      this.prevPhoto()
    }
  }

  nextPhoto = () => {
    this.setState(prevState => ({
      id: this.nextId(prevState)
    }), this.timer.reset)
  }

  prevPhoto = () => {
    this.setState(prevState => ({
      id: this.prevId(prevState)
    }), this.timer.reset)
  }

  nextId = (prevState) => {
    const quotient = Math.floor((prevState.id + 1) / this.photosSize)
    const nextId = quotient ? 0 : prevState.id + 1
    return nextId
  }

  prevId = (prevState) => {
    const prevId = prevState.id ? prevState.id - 1 : this.photosSize - 1
    return prevId
  }

  runToggleCarrousel = (timer) => {

    if (this.timer.isRunning()) {
      this.timer.reset()
      console.log("Arrêt du carrousel")

    } else {
      console.log("Lancement du carrousel")
      this.timer.start()
    }

  }

  componentWillUnmount() {
    console.log("Suppression du setInterval");

    this.timer.stop()

    document.removeEventListener("keypress", this.handleKey)
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  render() {

    const { photos } = this.props

    if (!photos || !photos.length) {
      return (
        <div>
          No photos
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <span className="arrow-left" onClick={this.prevPhoto} />
          <div>
            <img src={photos[this.state.id]} alt="Carrousel" />
            <Jauge progress={this.timer ? this.timer.getProgress() : 0 } />
          </div>
          <span className="arrow-right" onClick={this.nextPhoto} />
        </div>
        <div>
          {photos.map((p, i) => i === this.state.id
            ? <span key={i} className="dot selected" />
            : <span key={i} className="dot" />

          )}
        </div>
      </div>
    );
  }
}

export default Carrousel;
