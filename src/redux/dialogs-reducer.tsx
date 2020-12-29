import {v1} from "uuid";
import {InferActionsTypes} from "../types/types";

export type MessageType = {
    id: string
    message: string
}

export type DialogType = {
    id: string
    name: string
}

export type DialogsStateType = typeof initialState

const  initialState = {
    messages: [
        {id: v1(), message: 'Hi!'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'Yo Yo'},
    ] as Array<MessageType>,
    dialogs: [
        {id: v1(), name: 'Dima'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Viktor'},
        {id: v1(), name: 'Valera'},
    ] as Array<DialogType>
}
const dialogsReducer = (state = initialState, action: ActionsTypes): DialogsStateType => {

    switch (action.type) {
        case 'DIALOGS/ADD_MESSAGE':
            const newMessage: MessageType = {
                id: v1(),
                message: action.newMessageBody,
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addMessage: (newMessageBody: string) => ({type: 'DIALOGS/ADD_MESSAGE', newMessageBody} as const)
}

export default dialogsReducer