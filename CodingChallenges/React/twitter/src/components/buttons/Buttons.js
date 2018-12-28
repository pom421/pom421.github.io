import React from "react";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import ReplyButton from "./ReplyButton";
import RetweetButton from "./RetweetButton";
import "./buttons.css";

const Buttons = props => (
  <div className="buttons">
    <ReplyButton nb={props.nbReplies} isReplied={props.isReplied}/>
    <RetweetButton nb={props.nbRt} isRt={props.isRt} onRt={props.onRt}/>
    <LikeButton nb={props.nbLikes} isLiked={props.isLiked} onLike={props.onLike}/>
    <ShareButton />
  </div>
);

export default Buttons;
