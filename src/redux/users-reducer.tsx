import {usersApi} from "../api/users-api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";
import {InferActionsTypes, UserType} from "../types/types";

type InitialStateType = typeof initialState

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users id
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'USER/FOLLOW_SUCCESS':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})
            }
        case 'USER/UNFOLLOW_SUCCESS':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: false})
            }
        case 'USER/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'USER/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.page}
        }
        case 'USER/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'USER/SET_TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'USER/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'USER/FOLLOW_SUCCESS', id: userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USER/UNFOLLOW_SUCCESS', id: userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'USER/SET_USERS', users} as const),
    setCurrentPage: (page: number) => ({type: 'USER/SET_CURRENT_PAGE', page} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'USER/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setToggleIsFetching: (isFetching: boolean) => ({type: 'USER/SET_TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'USER/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType ) => {
        dispatch(actions.setToggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        let response = await usersApi.getUsers(page, pageSize)
        dispatch(actions.setToggleIsFetching(false))
        dispatch(actions.setUsers(response.items))
        dispatch(actions.setTotalUsersCount(response.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: DispatchType, id: number, apiMethod: (id: number) => Promise<any>,
                                  actionCreator: (id: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, id))
    let response = await apiMethod(id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(actions.toggleIsFollowingProgress(false, id))
}

export const follow = (id: number): ThunkType => {
    return async (dispatch: DispatchType) => {
      await followUnfollowFlow(dispatch, id, usersApi.follow.bind(usersApi), actions.followSuccess)
    }
}

export const unfollow = (id: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        await followUnfollowFlow(dispatch, id, usersApi.unfollow.bind(usersApi), actions.unfollowSuccess)
    }
}

export default usersReducer