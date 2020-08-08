export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
export const SET_TOGGLE_IS_FETCHING = 'SET-TOGGLE-IS-FETCHING';

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
}

export type FollowActionType  = {
    type: typeof FOLLOW
    id: string
}
export type UnfollowActionType  = {
    type: typeof UNFOLLOW
    id: string
}
export type SetUsersActionType  = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export type SetCurrentPageActionType  = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}

export type SetToggleIsFetchingActionType = {
    type: typeof SET_TOGGLE_IS_FETCHING
    isFetching: boolean
}

type ActionType = FollowActionType | UnfollowActionType |
    SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | SetToggleIsFetchingActionType;

const initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
            return {...state, totalUsersCount: action.totalUsersCount};
        }
        case SET_TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        default:
            return state;
    }
}

export const follow = (userId: string):FollowActionType => (
    {type: FOLLOW, id: userId})

export const unfollow = (userId: string): UnfollowActionType => (
    {type: UNFOLLOW, id: userId})

export const setUsers = (users: Array<UserType>): SetUsersActionType => (
    {type: SET_USERS, users})

export const setCurrentPage = (currentPage: number ): SetCurrentPageActionType => (
    {type: SET_CURRENT_PAGE, currentPage})

export const setTotalUsersCount = (totalUsersCount: number ): SetTotalUsersCountActionType => (
    {type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => (
    {type: SET_TOGGLE_IS_FETCHING, isFetching})

export default usersReducer;