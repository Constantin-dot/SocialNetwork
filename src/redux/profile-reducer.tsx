import {v1} from "uuid";
import {profileApi, usersApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {FormAction, stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_STATUS = 'profile/SET-STATUS';
const DELETE_POST = 'profile/DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS';
const SAVE_PROFILE = 'profile/SAVE-PROFILE';

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
export type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export type SaveProfileActionType = {
    type: typeof SAVE_PROFILE
    profile: ProfileDataFormType
}

type ActionType = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType
    | SavePhotoSuccessActionType

const initialState = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ],
    profile: null,
    status: "",
};

const profileReducer = (state: ProfilePageType = initialState, action: ActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: v1(),
                message: action.newPostText,
                likeCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
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
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => ({
    type: ADD_POST, newPostText
} as const)

export const setUserProfile = (profile: any): SetUserProfileActionType => ({
    type: SET_USER_PROFILE, profile
} as const)

export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS, status
} as const)

export const deletePost = (postId: string): DeletePostActionType => ({
    type: DELETE_POST, postId
} as const)

export const savePhotoSuccess = (photos: PhotosType) => ({
    type: SAVE_PHOTO_SUCCESS, photos
} as const)

type ThunkType = ThunkAction<void, RootState, unknown, ActionType | FormAction>

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
        try {
            let response = await profileApi.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
        catch (error) {

        }
    }
}
export const savePhoto = (file: any): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let response = await profileApi.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileDataFormType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        let response = await profileApi.saveProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
            dispatch(stopSubmit("editProfile", {_error: message}));
            return Promise.reject(message)
        }
    }
}

export default profileReducer;