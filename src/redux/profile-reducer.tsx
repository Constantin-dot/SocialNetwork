import {v1} from "uuid";
import {
    PostType,
    ProfilePageType,
    ActionType,
    AddPostActionType,
    ChangePostActionType,
    ADD_POST,
    CHANGE_NEW_POST_TEXT
} from "./usingTypes";

const initialState = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ],
    newPostText: '',
};
const profileReducer = (state: ProfilePageType = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: v1(),
                message: state.newPostText,
                likeCount: 0,
            };
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case CHANGE_NEW_POST_TEXT:
            return  {
                ...state,
                newPostText: action.newText
            };
        default:
            return state;
    }
}

export const addPostActionCreator = ():AddPostActionType => ({type: ADD_POST})

export const newTextChangeHandlerActionCreator = (text: string): ChangePostActionType => ({
    type: CHANGE_NEW_POST_TEXT, newText: text
})

export default profileReducer;