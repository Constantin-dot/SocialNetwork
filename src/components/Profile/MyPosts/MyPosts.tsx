import React, {ChangeEvent} from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {
    addPostActionCreator,
    DispatchActionType,
    newTextChangeHandlerActionCreator,
    PostType
} from "../../../redux/state";

type PropsType = {
    posts:Array<PostType>
    dispatch: (action: DispatchActionType) => void
    newPostText: string
}

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map((p) => <Post key={p.id} message ={p.message} likeCount={p.likeCount} id={p.id}/>)

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    };

    let newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        let action = newTextChangeHandlerActionCreator(text);
        props.dispatch(action);
    }

    return (
        <div className={classes.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={newTextChangeHandler}
                        value={props.newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;