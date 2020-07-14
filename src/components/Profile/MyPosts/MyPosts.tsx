import React, {ChangeEvent} from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { PostType} from "../../../redux/store";

type PropsType = {
    posts:Array<PostType>
    updateNewPostText: (text: string) => void
    addPost: () => void
    newPostText: string
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map((p) =>
        <Post
            key={p.id}
            message ={p.message}
            likeCount={p.likeCount}
            id={p.id}
        />
    );

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;