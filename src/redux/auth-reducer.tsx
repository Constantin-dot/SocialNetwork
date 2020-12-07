import {authApi, securityApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'

export type UserDataType = {
    id: number | null
    email: string | null
    login: string | null
}

export type AuthDataType = {
    isAuth: boolean
}

type CaptchaUrlType = {
    captchaUrl: string | null
}

export type InitialStateType = UserDataType & AuthDataType & CaptchaUrlType;

export type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: UserDataType
    isAuth: boolean
}

export type GetCaptchaUrlSuccess = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    captchaUrl: string
}

type ActionType = SetUserDataActionType
    | GetCaptchaUrlSuccess

let initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                isAuth: action.isAuth,
            }
        }
        case "auth/GET-CAPTCHA-URL-SUCCESS": {
            return {...state, captchaUrl: action.captchaUrl}
        }
        default:
            return state;
    }
}

export const setUserData = (payload: UserDataType, isAuth: boolean): SetUserDataActionType => ({
    type: SET_USER_DATA, payload, isAuth
});

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS, captchaUrl
})

type ThunkType = ThunkAction<void, RootState, unknown, ActionType | FormAction>

export const getUserData = (): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let response = await authApi.me()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setUserData({id, login, email}, true));
        }
    };
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType | FormAction>) => {
        let response = await authApi.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    };
}

export const logout = (): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserData({id: null, email: null, login: null}, false))
        }
    };
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let response = await securityApi.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    };
}

export default authReducer;