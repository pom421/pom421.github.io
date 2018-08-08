import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./buttons.css"

const ReplyButton = (props) => <span className={`button ${props.isReplied ? "clicked" : ""}`}><FontAwesomeIcon icon="reply" /><span className="nb">{props.nb}</span></span>

export default ReplyButton