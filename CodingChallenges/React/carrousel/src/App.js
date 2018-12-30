import React, { Component } from 'react';
import './App.css';
import Carrousel from "./Carrousel"

const PHOTOS = [
  "https://picsum.photos/400/600/?image=609",
  "https://picsum.photos/400/600/?image=817",
  "https://picsum.photos/400/600/?image=388",
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Carrousel</h2>
        <div>
          See <a href="https://github.com/pom421/pom421.github.io/tree/master/CodingChallenges/React/carrousel">code on GitHub</a>
        </div>
        <Carrousel photos={PHOTOS} />
      </div>
    );
  }
}

export default App;
