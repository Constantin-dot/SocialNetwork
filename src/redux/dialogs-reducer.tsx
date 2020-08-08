import {v1} from "uuid";

export const ADD_MESSAGE = 'ADD-MESSAGE';
export const CHANGE_NEW_DIALOG_TEXT = 'CHANGE-NEW-DIALOG-TEXT';

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


export type ChangeDialogActionType  = {
    type: typeof CHANGE_NEW_DIALOG_TEXT
    newText: string
}
export type AddMessageActionType  = {
    type: typeof ADD_MESSAGE
}

type ActionType = ChangeDialogActionType | AddMessageActionType;

const  initialState = {
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
}
const dialogsReducer = (state: DialogsPageType = initialState, action: ActionType) => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: v1(),
                message: state.newDialogText,
            };
            return {
                ...state,
                newDialogText: '',
                messages: [...state.messages, newMessage]
            };
        case CHANGE_NEW_DIALOG_TEXT:
            return {
                ...state,
                newDialogText: action.newText
            };
        default:
            return state;
    }
}

export const addMessageActionCreator = ():AddMessageActionType => ({type: ADD_MESSAGE})

export const newMessageChangeHandlerActionCreator = (text: string): ChangeDialogActionType => ({
    type: CHANGE_NEW_DIALOG_TEXT, newText: text
})

export default dialogsReducer;