import {v1} from "uuid";
import {DialogsPageType, MessageType} from "./store";

const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_NEW_DIALOG_TEXT = 'CHANGE-NEW-DIALOG-TEXT';

const dialogsReducer = (state: DialogsPageType, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: v1(),
                message: state.newDialogText,
            };
            state.messages.push(newMessage);
            state.newDialogText = '';
            return state;
        case CHANGE_NEW_DIALOG_TEXT:
            state.newDialogText = action.newText;
            return state;
        default:
            return state;
    }
}


export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export const newMessageChangeHandlerActionCreator = (text: string) => ({
    type: CHANGE_NEW_DIALOG_TEXT, newText: text
})

export default dialogsReducer;