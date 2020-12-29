import {ResultCodeEnum, ResultCodeForCaptcha} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {InferActionsTypes} from "../types/types";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";

type InitialStateType = typeof initialState

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

type ThunkType<R = Promise<void>> = ThunkAction<R, AppStateType, unknown, ActionsTypes | FormAction>

export const getUserData = (): ThunkType => {
    return async (dispatch) => {
        let meData = await authApi.me()
        if (meData.resultCode === ResultCodeEnum.Success) {
            let {id, login, email} = meData.data
            dispatch(actions.setUserData(id, login, email, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        let loginData = await authApi.login(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCodeForCaptcha.Success) {
            dispatch(getUserData())
        } else {
            if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : "some error"
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(actions.setUserData(null, null, null, false))
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let response = await securityApi.getCaptchaUrl()
        const captchaUrl = response.url
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }
}

export default authReducer