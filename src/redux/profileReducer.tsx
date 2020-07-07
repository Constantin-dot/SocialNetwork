import {PostType, ProfilePageType} from "./store";
import {v1} from "uuid";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';

const profileReducer = (state: ProfilePageType, action: any) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: v1(),
                message: state.newPostText,
                likeCount: 0,
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case CHANGE_NEW_POST_TEXT:
                state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const newTextChangeHandlerActionCreator = (text: string) => ({
    type: CHANGE_NEW_POST_TEXT, newText: text
})

export default profileReducer;