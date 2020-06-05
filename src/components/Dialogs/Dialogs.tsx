import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = () => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                <DialogItem id={"1"} name={"Dima"}/>
                <DialogItem id={"2"} name={"Andrey"}/>
                <DialogItem id={"3"} name={"Sveta"}/>
                <DialogItem id={"4"} name={"Sasha"}/>
                <DialogItem id={"5"} name={"Viktor"}/>
                <DialogItem id={"6"} name={"Valera"}/>
            </div>
            <div className={classes.messages}>
                <Message message={"Hi!"}/>
                <Message message={"How are you?"}/>
                <Message message={"Yo Yo"}/>
            </div>
        </div>
    )
}

export default Dialogs;