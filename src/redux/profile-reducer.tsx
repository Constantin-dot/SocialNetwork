import {v1} from "uuid";
import {profileApi, usersApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_STATUS = 'profile/SET-STATUS';
const DELETE_POST = 'profile/DELETE-POST';

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
    profile: ProfileType | null
    status: string
}

export type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: string
}

type ActionType = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType;


const initialState = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ],
    profile: null,
    status: "",
};

const profileReducer = (state: ProfilePageType = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: v1(),
                message: action.newPostText,
                likeCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => ({
    type: ADD_POST, newPostText
})

export const setUserProfile = (profile: any): SetUserProfileActionType => ({
    type: SET_USER_PROFILE, profile
})

export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS, status
})

export const deletePost = (postId: string): DeletePostActionType => ({
    type: DELETE_POST, postId
})

type ThunkType = ThunkAction<void, RootState, unknown, ActionType>

export const getUserProfile = (userId: number | null): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let response = await usersApi.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export const getStatus = (userId: string | undefined): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let response = await profileApi.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export default profileReducer;