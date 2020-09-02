import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MapDispatchPropsType, MapStatePropsType} from "./DialogsContainer";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {Textarea} from "../common/formsControls/FormsControls";

type FormDataType = {
    newMessageBody: string
}

type PropsDialogsType = MapDispatchPropsType & MapStatePropsType;

const Dialogs = (props:PropsDialogsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map( (d:DialogType) => <DialogItem key={d.id} id={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map((m:MessageType) => <Message key={m.id} message={m.message}/>)

    let addNewMessage = (values: FormDataType) => {
        props.addMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const maxLength50 = (maxLengthCreator(50));

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component={Textarea}
                validate={[requiredField, maxLength50]}
                name={"newMessageBody"}
                placeholder={"Enter your message"}
            />
        </div>
        <div><button>Add message</button></div>
    </form>
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: "dialogsAddMessageForm"})(AddMessageForm)

export default Dialogs;