import {v1} from "uuid";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {InferActionsTypes, PhotosType, PostType, ProfileType} from "../types/types";
import {profileApi} from "../api/profile-api";

type InitialStateType = typeof initialState

const initialState = {
    posts: [
        {id: v1(), message: 'hi, how are you?', likeCount: 5},
        {id: v1(), message: 'It\'s my first post', likeCount: 11},
    ] as PostType[],
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST':
            const newPost: PostType = {
                id: v1(),
                message: action.newPostText,
                likeCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        case 'PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'PROFILE/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile: any) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: string) => ({type: 'PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes | FormAction>

export const getUserProfile = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.getProfile(userId)
        dispatch(actions.setUserProfile(response))
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId)
        dispatch(actions.setStatus(response))
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileApi.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(actions.setStatus(status))
            }
        }
        catch (error) {

        }
    }
}
export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file)
        if (response.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        let response = await profileApi.saveProfile(profile)
        if (response.resultCode === 0) {
            if (userId !== 0) {
                dispatch(getUserProfile(userId))
            } else {
                throw new Error("userId can't be null")
            }
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : "some error"
            dispatch(stopSubmit("editProfile", {_error: message}))
            return Promise.reject(message)
        }
    }
}

export default profileReducer