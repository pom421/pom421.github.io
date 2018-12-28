import React, { Component } from 'react';
import './App.css';
import Carrousel from "./Carrousel"

const PHOTOS = [
  "https://picsum.photos/400/600/?image=609",
  "https://picsum.photos/400/600/?image=817",
  "https://picsum.photos/400/600/?image=388",
]

const PHOTOS2 = [
  "https://picsum.photos/400/600/?image=109",
  "https://picsum.photos/400/600/?image=217",
  "https://picsum.photos/400/600/?image=488",
]


class App extends Component {
  render() {
    return (
      <div className="App">
        <Carrousel photos={PHOTOS} />
        { /*<Carrousel photos={PHOTOS2} /> */}
      </div>
    );
  }
}

export default App;
