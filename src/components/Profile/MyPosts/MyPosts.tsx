import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";


const MyPosts = () => {
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
                <Post message ={`hi, how are you?`} likeCount={5} />
                <Post message ={`It's my first post`} likeCount={11} />
            </div>
        </div>
    )
}

export default MyPosts;