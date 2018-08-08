import React from "react";
import "./Time.css";
import moment from "moment"

const Time = props => {
    return <span className="time">{moment(props.time).fromNow()}</span>;
}

export default Time;
