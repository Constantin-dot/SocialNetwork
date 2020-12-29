import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MapDispatchPropsType, MapStatePropsType} from "./DialogsContainer";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import AddMessageForm from "./AddMessageForm";
import {DialogsFormDataType} from "../../types/types";

type DialogsPropsType = MapDispatchPropsType & MapStatePropsType

const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, addMessage}) => {
    let dialogsElements = dialogsPage.dialogs.map( (d:DialogType) => <DialogItem
        key={d.id} id={d.id} name={d.name}/>)
    let messagesElements = dialogsPage.messages.map((m:MessageType) => <Message
        key={m.id} message={m.message}/>)

    let addNewMessage = (values: DialogsFormDataType) => {
        addMessage(values.newMessageBody)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs