import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction} from "redux-form";
import {getUserData} from "./auth-reducer";
import {InferActionsTypes} from "../types/types";

type InitialStateType = typeof initialState

const initialState = {
    initialized: false,
    globalError: null as string | null
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccessAC: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes | FormAction>

export const initializeApp = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        let promise = dispatch(getUserData())
        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccessAC())
        })
    }
}

export default appReducer