
import {
    ActionType,
    FollowActionType,
    SetCurrentPageActionType, SetTotalUsersCountActionType,
    SetUsersActionType,
    UnfollowActionType
} from "./usingTypes";

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

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
}

const initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
};

const usersReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
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
            return {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_USERS_COUNT: {
            debugger
            return {...state, totalUsersCount: action.totalUsersCount};
        }
        default:
            return state;
    }
}

export const followAC = (userId: string):FollowActionType => (
    {type: FOLLOW, id: userId})

export const unfollowAC = (userId: string): UnfollowActionType => (
    {type: UNFOLLOW, id: userId})

export const setUsersAC = (users: Array<UserType>): SetUsersActionType => (
    {type: SET_USERS, users})

export const setCurrentPageAC = (currentPage: number ): SetCurrentPageActionType => (
    {type: SET_CURRENT_PAGE, currentPage})

export const setTotalUsersCountAC = (totalUsersCount: number ): SetTotalUsersCountActionType => (
    {type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export default usersReducer;