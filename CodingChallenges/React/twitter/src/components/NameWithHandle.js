import React from "react";
import "./NameWithHandle.css";

const NameWithHandle = props => (
  <span>
    <span>
      <b>{props.user}</b>
    </span>{" "}
    <span className="handle">{props.handle}</span>
  </span>
);

export default NameWithHandle;
