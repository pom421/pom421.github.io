import React, { Component } from 'react';
import "./Carrousel.css"
import Bullet from "./Bullet"
import Timer from "./Timer"

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
        this.setState(prevState => ({
          id: this.nextId(prevState)
        }))
      }
    })

    this.runToggleCarrousel(this.timer)

    // BE CAREFUL : keypress is obsolete and may lead to some strange behaviour on browser
    //document.addEventListener("keypress", this.handleKey, false)
    document.addEventListener("keydown", this.handleKey, false)
  }

  componentWillUnmount() {
    console.log("Suppression du setInterval");

    this.timer.stop()

    document.removeEventListener("keydown", this.handleKey)
  }

  handleKey = (event) => {
    console.log("key", event.key)

    if (event.key === " " || event.key === "Spacebar") {
      this.runToggleCarrousel()
    } else if (event.key === "ArrowRight") {
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
    this.setState(_ => ({
      id
    }), () => !this.state.pause && this.timer.reset())
  }

  nextId = (prevState) => {
    const nextId = prevState.id + 1
    return nextId === this.photosSize ? 0 : nextId
  }

  prevId = (prevState) => {
    const prevId = prevState.id - 1
    return prevId < 0 ? this.photosSize - 1 : prevId
  }

  runToggleCarrousel = () => {

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
          {photos.map((_, i) =>

            <Bullet key={i} id={i} selected={this.state.id} pause={this.state.pause} onClick={() => this.idPhoto(i)} />

          )}
        </div>
      </div>
    );
  }
}

export default Carrousel;
