import React, { Component } from 'react';
import "./Carrousel.css"
import Bullet from "./Bullet"

class Timer {
  constructor({ duration, callback }) {
    this.duration = duration
    this.callback = callback
  }

  start = () => {
    if (!this.id) {
      this.id = setInterval(this.callback, this.duration)
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

  pause = () => {
    this.stop()
  }
}

class Carrousel extends Component {

  state = {
    id: 0,
    pause: false,
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
    }), () => !this.state.pause && this.timer.reset())
  }

  prevPhoto = () => {
    this.setState(prevState => ({
      id: this.prevId(prevState)
    }), () => !this.state.pause && this.timer.reset())
  }

  idPhoto = (id) => {
    this.setState(prevState => ({
      id
    }), () => !this.state.pause && this.timer.reset())
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
      this.timer.pause()
      this.setState({
        pause: true
      })
      console.log("Arrêt du carrousel")

    } else {
      this.setState({
        pause: false
      })
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
          <img className="nice" src={photos[this.state.id]} alt="Carrousel" />
          <span className="arrow-right" onClick={this.nextPhoto} />
        </div>
        <div>
          {/*photos.map((p, i) => i === this.state.id
            ? <span key={i} className="dot selected" onClick={() => this.idPhoto(i)} />
            : <span key={i} className="dot" onClick={() => this.idPhoto(i)} />

          )*/}
          {photos.map((p, i) =>

            <Bullet key={i} id={i} selected={this.state.id} pause={this.state.pause} onClick={() => this.idPhoto(i)} />

          )}
        </div>
      </div>
    );
  }
}

export default Carrousel;
