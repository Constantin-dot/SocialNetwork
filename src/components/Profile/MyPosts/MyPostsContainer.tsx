import React from "react";
import {addPostActionCreator, newTextChangeHandlerActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {StoreContextConsumer} from "../../../StoreContext";

type PropsType = {

}

const MyPostsContainer = (props: PropsType) => {

    return (
        <StoreContextConsumer>
            { store => {
                let state = store.getState();

                let addPost = () => {
                    store.dispatch(addPostActionCreator(state.profilePage.newPostText));
                };

                let onPostChange = (text: string) => {
                    let action = newTextChangeHandlerActionCreator(text);
                    store.dispatch(action);
                }

                return <MyPosts
                    updateNewPostText={onPostChange}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                />
            } }
        </StoreContextConsumer>
    )
}

export default MyPostsContainer;