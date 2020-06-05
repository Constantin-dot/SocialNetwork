import React from "react";
import classes from "./Message.module.css";

type PropsTypeMessage = {
    message: string
}

const Message:React.FC<PropsTypeMessage> = (props) => {
    return (
        <div className={classes.messages}>{props.message}</div>
    )
}

export default Message;