import React from "react";
import classes from "./Post.module.css";

type MessageType = {
    message: string
    likeCount: number
}

const Post: React.FC<MessageType> = (props) => {
    return (
        <div className={classes.item}>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSz3oe7au6Voj7bwkAdVqEhbemBlvOSDNsybGBb-1nN_q4gPhB3&usqp=CAU'} alt={'ava'}></img>
            {props.message}
            <div>
                <span>likes </span>{props.likeCount}
            </div>
        </div>
    )
}

export default Post;