import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../common/formsControls/FormsControls";
import {reduxForm, InjectedFormProps} from "redux-form";
import {ProfileType} from "../../../types/types";

type ProfileFormPropsType = {
    profile: ProfileType
}

type ProfileFormValuesTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileFormPropsType> & ProfileFormPropsType> = ({handleSubmit, error, profile}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField<ProfileFormValuesTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a
                job</b>: {createField<ProfileFormValuesTypeKeys>("", "lookingForAJob", [], Input, "checkbox")}
        </div>
        <div>
            <b>My professional
                skills</b>: {createField<ProfileFormValuesTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField<ProfileFormValuesTypeKeys>("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile?.contacts).map(key => {
            return <div key={key}>
                <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
        <div>
            <button>Save</button>
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileFormPropsType>({form: "editProfile"})(ProfileDataForm)

export default ProfileDataReduxForm