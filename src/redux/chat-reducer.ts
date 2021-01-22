import {chatAPI, ChatMessageType} from "../api/chat-api";
import {InferActionsTypes} from "../types/types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type){
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: DispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch: DispatchType) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsTypes>

export default chatReducer