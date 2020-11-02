import {usersApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW_SUCCESS = 'users/FOLLOW-SUCCESS';
const UNFOLLOW_SUCCESS = 'users/UNFOLLOW-SUCCESS';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const SET_TOGGLE_IS_FETCHING = 'users/SET-TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS';

export type LocationType = {
    city: string
    country: string
}

export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: string
    name: string
    status: string,
    location: LocationType
    followed: boolean
    photos: PhotosType
}

type InitialStateType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: string[],
}

export type FollowSuccessActionType = {
    type: typeof FOLLOW_SUCCESS
    id: string
}
export type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW_SUCCESS
    id: string
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    page: number
}

export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}

export type SetToggleIsFetchingActionType = {
    type: typeof SET_TOGGLE_IS_FETCHING
    isFetching: boolean
}

export type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: string
}

type ActionType = FollowSuccessActionType | UnfollowSuccessActionType |
    SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | SetToggleIsFetchingActionType |
    ToggleIsFollowingProgressActionType;

const initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: ['2', '3', '4'],
};

const usersReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case FOLLOW_SUCCESS:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})
                // users: state.users.map(u => {
                //     if (u.id === action.id) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // }),
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: false})
                // users: state.users.map(u => {
                //     if (u.id === action.id) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // }),
            }
        case SET_USERS: {
            return {...state, users: action.users};
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.page};
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount};
        }
        case SET_TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: string): FollowSuccessActionType => (
    {type: FOLLOW_SUCCESS, id: userId})

export const unfollowSuccess = (userId: string): UnfollowSuccessActionType => (
    {type: UNFOLLOW_SUCCESS, id: userId})

export const setUsers = (users: Array<UserType>): SetUsersActionType => (
    {type: SET_USERS, users})

export const setCurrentPage = (page: number): SetCurrentPageActionType => (
    {type: SET_CURRENT_PAGE, page})

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => (
    {type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => (
    {type: SET_TOGGLE_IS_FETCHING, isFetching})

export const toggleIsFollowingProgress = (isFetching: boolean, userId: string): ToggleIsFollowingProgressActionType => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

type ThunkType = ThunkAction<void, RootState, unknown, ActionType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        dispatch(setToggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let response = await usersApi.getUsers(page, pageSize)
        dispatch(setToggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));
    }
}

// apiMethod: (userId: number) => Promise<APIResponseType> дописать типизацию для апи респонса


const followUnfollowFlow = async (dispatch: ThunkDispatch<RootState, unknown, ActionType>, id: string, apiMethod: (id: string) => Promise<any>, actionCreator: (id: string) => ActionType) => {
    dispatch(toggleIsFollowingProgress(true, id))
    debugger
    let response = await apiMethod(id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgress(false, id))
}

export const follow = (id: string): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
      await followUnfollowFlow(dispatch, id, usersApi.follow.bind(usersApi), followSuccess)
    }
}

export const unfollow = (id: string): ThunkType => {
    return async (dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
        await followUnfollowFlow(dispatch, id, usersApi.unfollow.bind(usersApi), unfollowSuccess)
    }
}

export default usersReducer;