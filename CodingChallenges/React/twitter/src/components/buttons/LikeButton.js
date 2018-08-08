import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.css";

const LikeButton = props => {
  return (
    <a href="#" onClick={props.onLike}>
      <span className={`button ${props.isLiked ? "clicked" : ""}`}>
        <FontAwesomeIcon icon="heart" />
        <span className="nb">{props.nb}</span>
      </span>
    </a>
  );
};

export default LikeButton;
