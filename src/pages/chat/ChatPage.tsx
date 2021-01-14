import React, {useEffect, useState} from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const ChatPage: React.FC = () => {
    return <>
        <Chat/>
    </>
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('WEB SOCKET IS CLOSED')
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () =>  {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px"
    }}>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return <div style={{height: "500px", overflowY: "auto", width: "800px"}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage("")
    }

    return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "800px"}}>
        <textarea
            style={{margin: "30px"}}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}>

        </textarea>
        <button
            disabled={wsChannel === null || readyStatus !== 'ready'}
            onClick={sendMessage}
        >Send
        </button>
    </div>
}
export default ChatPage