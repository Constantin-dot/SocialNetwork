import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsType} from "../../../index";


type PropsType = {
    posts:Array<PostsType>
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map((p) => <Post message ={p.message} likeCount={p.likeCount} />)

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;