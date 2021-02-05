import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType, StatusType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return <>
        <Chat/>
    </>
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px"
        }}
    >
        {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget

        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScrollActive && setIsAutoScrollActive(true)
        } else {
            isAutoScrollActive && setIsAutoScrollActive(false)
        }
    }

    return <div
        style={{height: "500px", overflowY: "auto", width: "800px"}}
        onScroll={scrollHandler}
    >
        {messages.map((m) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}/>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return <div>
        <img
            alt={'userPick'}
            src={message.photo}
            style={{width: "30px", borderRadius: "30%", marginRight: "5px"}}
        />
        <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector<AppStateType, StatusType>((state) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage("")
    }

    return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "800px"}}>
        <textarea
            style={{margin: "30px"}}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}>
        </textarea>
        <button
            disabled={status !== 'ready'}
            onClick={sendMessageHandler}
        >Send
        </button>
    </div>
}
export default ChatPage