import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../redux/store";
import {MapDispatchPropsType, MapStatePropsType} from "./DialogsContainer";

type PropsDialogsType = MapDispatchPropsType & MapStatePropsType;

const Dialogs = (props:PropsDialogsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map( (d:DialogType) => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map((m:MessageType) => <Message key={m.id} message={m.message}/>)

    let addMessage = () => {
        props.addMessage();
    }

    let newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.newTextChangeHandler(text);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea
                        onChange={newTextChangeHandler}
                        value={props.dialogsPage.newDialogText}
                        placeholder={'Enter your message'}
                    />
                </div>
                <div>
                    <button onClick={addMessage}>Add message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;