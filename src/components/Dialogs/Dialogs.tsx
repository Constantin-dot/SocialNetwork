import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, DialogsPageType, MessagesType} from "../../index";

type PropsDialogsType = {
    dialogsPage: DialogsPageType
}

const Dialogs = (props:PropsDialogsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map( (d:DialogsType) => <DialogItem id={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map((m:MessagesType) => <Message message={m.message}/>)


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;