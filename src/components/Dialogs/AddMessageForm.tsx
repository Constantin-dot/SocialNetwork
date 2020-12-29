import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/formsControls/FormsControls";
import { DialogsFormDataType } from "../../types/types";

type DialogsFormValuesTypeKeys = Extract<keyof DialogsFormDataType, string>

const maxLength50 = (maxLengthCreator(50))

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<DialogsFormValuesTypeKeys>("Enter your message",
                "newMessageBody",
                [requiredField, maxLength50],
                Textarea)}
        </div>
        <div><button>Add message</button></div>
    </form>
}

export default reduxForm<DialogsFormDataType>({form: "dialogsAddMessageForm"})(AddMessageForm)
