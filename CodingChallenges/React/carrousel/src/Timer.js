export default class Timer {
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
