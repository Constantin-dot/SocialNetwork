import {v1} from "uuid";

export const ADD_POST = 'ADD-POST';
export const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';

export type PhotosType = {
    "small": string
    "large": string
}

export type ContactsType = {
    "facebook": string | null
    "website": string | null
    "vk": string | null
    "twitter": string | null
    "instagram": string | null
    "youtube": string | null
    "github": string | null
    "mainLink": string | null
}

export type ProfileType = {
    "aboutMe": string | null,
    "contacts": ContactsType,
    "lookingForAJob": boolean,
    "lookingForAJobDescription": string | null,
    "fullName": string | null,
    "userId": number,
    "photos": PhotosType
}

export type PostType = {
    id: string
    message: string
    likeCount: number
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType | null
}



export type AddPostActionType  = {
    type: typeof ADD_POST
}

export type ChangePostActionType  = {
    type: typeof CHANGE_NEW_POST_TEXT
    newText: string
}

export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

type ActionType = ChangePostActionType | AddPostActionType |
    SetUserProfileActionType;


const initialState = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ],
    newPostText: '',
    profile: null,
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
        case SET_USER_PROFILE:{
            return  {
                ...state,
                profile: action.profile
            };
        }

        default:
            return state;
    }
}

export const addPostActionCreator = ():AddPostActionType => ({type: ADD_POST})

export const newTextChangeHandlerActionCreator = (text: string): ChangePostActionType => ({
    type: CHANGE_NEW_POST_TEXT, newText: text
})

export const setUserProfile = (profile: any): SetUserProfileActionType => ({
    type: SET_USER_PROFILE, profile
})

export default profileReducer;