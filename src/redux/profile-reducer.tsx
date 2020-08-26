import {v1} from "uuid";
import {profileApi, usersApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";

export const ADD_POST = 'ADD-POST';
export const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';
export const SET_USER_PROFILE = 'SET-USER-PROFILE';
export const SET_STATUS = 'SET-STATUS';

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
    status: string
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

export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

type ActionType = ChangePostActionType | AddPostActionType |
    SetUserProfileActionType | SetStatusActionType;


const initialState = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ],
    newPostText: '',
    profile: null,
    status: "",
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
        case SET_STATUS:{
            return  {
                ...state,
                status: action.status
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

export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS, status
})

type ThunkType = ThunkAction<void, RootState, unknown, ActionType>

export const getUserProfile = (userId: string | undefined): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        usersApi.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    }
}

export const getStatus = (userId: string | undefined): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        profileApi.getStatus(userId).then(data => {
            dispatch(setStatus(data));
        });
    }
}

export const updateStatus = (status: string): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        profileApi.updateStatus(status).then(data => {
            if(data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export default profileReducer;