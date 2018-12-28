import React from "react";
import Avatar from "./Avatar";
import Message from "./Message";
import NameWithHandle from "./NameWithHandle";
import Time from "./Time";
import Buttons from "./buttons/Buttons";

import "./Tweet.css";

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.message.isLiked,
      isRt: props.message.isRt,
      isReplied: props.message.isReplied
    };
  }

  toggleLike = e => {
    this.setState(prevState => {
      return { isLiked: !prevState.isLiked };
    });
  };

  toggleRt = e => {
    this.setState(prevState => {
      return { isRt: !prevState.isRt };
    });
  };

  render() {
    const { user, message } = this.props;

    return (
      <div className="tweet">
        <Avatar user={user.name} avatar={user.avatar} />
        <div>
          <div>
            <NameWithHandle user={user.name} handle={user.handle} />
            <Time time={message.time} />
          </div>
          <Message text={message.text} />
          <Buttons
            nbRt={message.nbRt}
            nbReplies={message.nbReplies}
            nbLikes={message.nbLikes}
            isRt={this.state.isRt}
            isReplied={message.isReplied}
            isLiked={this.state.isLiked}
            onLike={this.toggleLike}
            onRt={this.toggleRt}
          />
        </div>
      </div>
    );
  }
}

export default Tweet;
