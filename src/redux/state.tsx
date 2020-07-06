import {v1} from "uuid";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_NEW_DIALOG_TEXT = 'CHANGE-NEW-DIALOG-TEXT';

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

export type DispatchActionType = {
    type: string
    newText?: string
}

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

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost: PostType = {
                id: v1(),
                message: this._state.profilePage.newPostText,
                likeCount: 0,
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber();
        } else if (action.type === 'CHANGE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber();
        } else if (action.type === 'ADD-MESSAGE') {
            const newMessage: MessageType = {
                id: v1(),
                message: this._state.dialogsPage.newDialogText,
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newDialogText = '';
            this._callSubscriber();
        } else if (action.type === 'CHANGE-NEW-DIALOG-TEXT') {
            this._state.dialogsPage.newDialogText = action.newText;
            this._callSubscriber();
        }
    },

}

export const addPostActionCreator = () => ({type: ADD_POST})

export const newTextChangeHandlerActionCreator = (text: string) => ({
        type: CHANGE_NEW_POST_TEXT, newText: text
})

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export const newMessageChangeHandlerActionCreator = (text: string) => ({
        type: CHANGE_NEW_DIALOG_TEXT, newText: text
})

export default store;
//@ts-ignore
window.store = store;