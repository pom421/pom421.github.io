import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Tweet from "./components/Tweet";

import tweets from "./api/data-tweets.json";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faShareAlt,
  faReply,
  faRetweet
} from "@fortawesome/free-solid-svg-icons";

// ajout des icones utilisées dans l'app dans une librairie font-awesome
library.add(faHeart, faShareAlt, faReply, faRetweet);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }

  componentDidMount() {
    // Fake fetch of data via Ajax
    this.setState({
      tweets
    });
  }

  render() {
    return (
      <div>
        <h1>Twiiiiiter</h1>
        <p>
          See{" "}
          <a href="https://github.com/pom421/pom421.github.io/tree/master/CodingChallenges/React/twitter">
            code on GitHub
          </a>
        </p>
        <hr />
        <div>
          {this.state.tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
