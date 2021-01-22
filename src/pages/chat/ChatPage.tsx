import React, {useEffect, useRef, useState} from "react";
import {ChatMessageType} from "../../api/chat-api";
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

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px"
    }}>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    const messagesAnchorRef = useRef<HTMLDivElement>(null)


    return <div
        style={{height: "500px", overflowY: "auto", width: "800px"}}
        onScroll={(e) => {
            let element = e.currentTarget
            let maxScrollPosition = element.scrollHeight - element.clientHeight

            if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 5) {
                setIsAutoScrollActive(true)
            } else {
                setIsAutoScrollActive(false)
            }
            setLastScrollTop(e.currentTarget.scrollTop)
        }}
    >
        {messages.map((m, index) => <Message key={index} message={m}/>)}
        <div ref={messagesAnchorRef}/>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
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
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const dispatch = useDispatch()

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
            disabled={false}
            onClick={sendMessageHandler}
        >Send
        </button>
    </div>
}
export default ChatPage