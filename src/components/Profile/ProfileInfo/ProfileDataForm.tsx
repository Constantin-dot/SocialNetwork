import React from "react";
import {createField, Input, Textarea} from "../../common/formsControls/FormsControls";
import {reduxForm, InjectedFormProps} from "redux-form";

type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
}

export type ProfileDataFormType = {
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: ContactsType
}

type ProfileFormPropsType = {
    profile: ProfileDataFormType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType, ProfileFormPropsType> & ProfileFormPropsType > = ({handleSubmit, error, profile}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, "checkbox")}
        </div>
        <div>
            <b>My professional skills</b>: {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
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

const ProfileDataReduxForm = reduxForm<ProfileDataFormType, ProfileFormPropsType>({form: "editProfile"})(ProfileDataForm)

export default ProfileDataReduxForm