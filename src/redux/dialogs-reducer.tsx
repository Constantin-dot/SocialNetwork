import {v1} from "uuid";

const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';

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
}

export type AddMessageActionType  = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

type ActionType = AddMessageActionType;

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
}
const dialogsReducer = (state: DialogsPageType = initialState, action: ActionType) => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: v1(),
                message: action.newMessageBody,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageBody: string):AddMessageActionType => ({
    type: ADD_MESSAGE, newMessageBody
})

export default dialogsReducer;