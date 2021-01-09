import React, {useEffect, useState} from "react";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const ChatPage: React.FC = () => {
    return <>
        <Chat />
    </>
}

const Chat: React.FC = () => {

    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "30px"}}>
        <Messages/>
        <ChatMessagesForm/>
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    })

    return <div style={{ height: "500px", overflowY: "auto", width: "800px" }}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: "30px", borderRadius: "30%", marginRight: "5px"}}/>
        <b>{message.userName}</b>
        <br/>
        {message.message}
       <hr/>
    </div>
}

const ChatMessagesForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage("")
    }

    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "800px"}}>
        <textarea
            style={{ margin: "30px"}}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}>

        </textarea>
        <button onClick={sendMessage}>Send</button>
    </div>
}
export default ChatPage