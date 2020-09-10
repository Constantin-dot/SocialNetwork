import {usersApi} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import { RootState } from "./redux-store";

export const FOLLOW_SUCCESS = 'FOLLOW-SUCCESS';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW-SUCCESS';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
export const SET_TOGGLE_IS_FETCHING = 'SET-TOGGLE-IS-FETCHING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

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

export type FollowSuccessActionType  = {
    type: typeof FOLLOW_SUCCESS
    id: string
}
export type UnfollowSuccessActionType  = {
    type: typeof UNFOLLOW_SUCCESS
    id: string
}
export type SetUsersActionType  = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export type SetCurrentPageActionType  = {
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
    followingInProgress: ['2','3','4'],
};

const usersReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case FOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
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

export const followSuccess = (userId: string):FollowSuccessActionType => (
    {type: FOLLOW_SUCCESS, id: userId})

export const unfollowSuccess = (userId: string): UnfollowSuccessActionType => (
    {type: UNFOLLOW_SUCCESS, id: userId})

export const setUsers = (users: Array<UserType>): SetUsersActionType => (
    {type: SET_USERS, users})

export const setCurrentPage = (page: number ): SetCurrentPageActionType => (
    {type: SET_CURRENT_PAGE, page})

export const setTotalUsersCount = (totalUsersCount: number ): SetTotalUsersCountActionType => (
    {type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => (
    {type: SET_TOGGLE_IS_FETCHING, isFetching})

export const toggleIsFollowingProgress = (isFetching: boolean, userId: string): ToggleIsFollowingProgressActionType => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

type ThunkType = ThunkAction<void, RootState, unknown, ActionType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        dispatch(setToggleIsFetching(true));
        dispatch(setCurrentPage(page));
        usersApi.getUsers(page, pageSize).then(data => {
            dispatch(setToggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const follow = (id: string): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        dispatch(toggleIsFollowingProgress(true, id));
        usersApi.follow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(id));
            }
            dispatch(toggleIsFollowingProgress(false, id));
        });
    }
}

export const unfollow = (id: string): ThunkType => {
    return (dispatch: ThunkDispatch< RootState , unknown , ActionType >) => {
        dispatch(toggleIsFollowingProgress(true, id));
        usersApi.unfollow(id).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(id));
            }
            dispatch(toggleIsFollowingProgress(false, id));
        });
    }
}

export default usersReducer;