import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./buttons.css";

const RetweetButton = props => {
  return (
    <a href="#" onClick={props.onRt}>
      <span className={`button ${props.isRt ? "clicked" : ""}`}>
        <FontAwesomeIcon icon="retweet" />
        <span className="nb">{props.nb}</span>
      </span>
    </a>
  );
};

export default RetweetButton;
