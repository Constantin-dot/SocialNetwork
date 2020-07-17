import {v1} from "uuid";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

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

export type ActionType = ChangeDialogActionType | AddMessageActionType | ChangePostActionType | AddPostActionType

let store: StoreType = {
    _state:  {
        profilePage : {
            posts: [
                {id: v1(), message: 'hi, how are you?', likeCount: 5},
                {id: v1(), message: 'It\'s my first post', likeCount: 11},
            ],
            newPostText: '',
        },
        dialogsPage : {
            messages: [
                {id: v1(), message: 'Hi!'},
                {id: v1(), message: 'How are you?'},
                {id: v1(), message: 'Yo Yo'},
            ],
            dialogs: [
                {id: v1(), name: 'Dima'},
                {id: v1(), name: 'Andrey'},
                {id: v1(), name: 'Sveta'},
                {id: v1(), name: 'Sasha'},
                {id: v1(), name: 'Viktor'},
                {id: v1(), name: 'Valera'},
            ],
            newDialogText: '',
        },
    },

    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer: any) {
        this._callSubscriber = observer;
    },

    dispatch(action: ActionType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber();
    },

}

export default store;
//@ts-ignore
window.store = store;