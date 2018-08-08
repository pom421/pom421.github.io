import React from "react";

import "./Avatar.css";

const Avatar = props => (
  <div className="avatar">
    <img alt={`avatar ${props.user}`} src={props.avatar} />
  </div>
);

export default Avatar;
