import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../common/formsControls/FormsControls";

let maxLength10 = maxLengthCreator(10)

type PropsType = {}

export type AddPostFormDataType = {
    newPostText: string
}

type AddPostFormDataTypeKeys = GetStringKeys<AddPostFormDataType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormDataType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormDataTypeKeys>("Enter your post", "newPostText", [requiredField, maxLength10], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormDataType>({form: 'login'})(AddPostForm)