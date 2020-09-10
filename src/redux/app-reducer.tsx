import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";
import {FormAction} from "redux-form";
import {getUserData} from "./auth-reducer";

let initialState:InitialStateType = {
   initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {...state, initialized: true}
        default:
            return state;
    }
}
//actions
export const initializedSuccessAC = () => ({type: 'INITIALIZED-SUCCESS'} as const)
//thunks
export const initializeApp = (): ThunkType => {
    return (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        let promise = dispatch(getUserData())
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccessAC())
        })
    }
}
//types
export type InitialStateType = {
    initialized: boolean
};

export type SetInitializedActionType = ReturnType<typeof initializedSuccessAC>

type ActionType = SetInitializedActionType;

type ThunkType = ThunkAction<void, RootState, unknown, ActionType|FormAction>

export default appReducer;