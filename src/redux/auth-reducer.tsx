import {authApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";

export const SET_USER_DATA = 'SET-USER-DATA';

export type UserDataType = {
    id: number | null
    email: string | null
    login: string | null
}

export type AuthDataType = {
    isAuth: boolean
}

export type InitialStateType = UserDataType & AuthDataType;

export type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: UserDataType
    isAuth: boolean
}

type ActionType = SetUserDataActionType;

let initialState:InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
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
        default:
            return state;
    }
}

export const setUserData = (payload: UserDataType, isAuth: boolean): SetUserDataActionType => ({
        type: SET_USER_DATA, payload, isAuth
});

type ThunkType = ThunkAction<void, RootState, unknown, ActionType|FormAction>

export const getUserData = (): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        return authApi.me().then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setUserData({id, login, email}, true));
            }
        });
    };
}



export const login = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType |FormAction >) => {
        authApi.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
               dispatch(getUserData())
            } else {
                let message = data.messages.length > 0 ? data.messages[0] : "some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
        });
    };
}

export const logout = (): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        authApi.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData({id: null, email: null, login: null}, false))
            }
        });
    };
}

export default authReducer;