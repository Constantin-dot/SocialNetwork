
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
    data: UserDataType
}

type ActionType = SetUserDataActionType;

let initialState = {
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
                ...action.data,
                isAuth: true,
            }
        }
        default:
            return state;
    }
}

export const setUserData = (data: UserDataType): SetUserDataActionType => ({
        type: SET_USER_DATA, data
});

export default authReducer;