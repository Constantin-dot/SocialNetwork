import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostForm, {AddPostFormDataType} from "./AddPostForm";
import {PostType} from "../../../types/types";

type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {

    let postsElements = props.posts.map((p) =>
        <Post
            key={p.id}
            message ={p.message}
            likeCount={p.likeCount}
            id={p.id}
        />
    )

    let addNewPost = (values: AddPostFormDataType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={addNewPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts