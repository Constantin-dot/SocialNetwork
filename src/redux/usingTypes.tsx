import {FOLLOW, SET_CURRENT_PAGE, SET_TOTAL_USERS_COUNT, SET_USERS, UNFOLLOW, UserType} from "./users-reducer";

export const ADD_MESSAGE = 'ADD-MESSAGE';
export const CHANGE_NEW_DIALOG_TEXT = 'CHANGE-NEW-DIALOG-TEXT';
export const ADD_POST = 'ADD-POST';
export const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';

export type PostType = {
    id: string
    message: string
    likeCount: number
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

export type MessageType = {
    id: string
    message: string
}

export type DialogType = {
    id: string
    name: string
}

export type DialogsPageType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    newDialogText: string
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: StateType,
    _callSubscriber: () => void,
    getState: () => StateType,
    subscribe:(observer: any) => void,
    dispatch:(action: any) => void,
}

export type ChangeDialogActionType  = {
    type: typeof CHANGE_NEW_DIALOG_TEXT
    newText: string
}
export type AddMessageActionType  = {
    type: typeof ADD_MESSAGE
}

export type ChangePostActionType  = {
    type: typeof CHANGE_NEW_POST_TEXT
    newText: string
}
export type AddPostActionType  = {
    type: typeof ADD_POST
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

export type ActionType = ChangeDialogActionType | AddMessageActionType |
    ChangePostActionType | AddPostActionType |
    FollowActionType | UnfollowActionType |
    SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType
