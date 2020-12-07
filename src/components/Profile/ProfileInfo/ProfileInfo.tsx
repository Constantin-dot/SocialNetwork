import React, {ChangeEvent, useState} from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.png";
import ProfileDataReduxForm, { ProfileDataFormType } from "./ProfileDataForm";


type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileDataFormType) => void
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) => {
    const [editMode, setEditMode] = useState(false)

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData: ProfileDataFormType) => {
        saveProfile(formData)
        // setEditMode(false)
    }

    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={classes.descriptionBlock}>
            <img src={profile.photos.large || userPhoto} alt={"large user's ava"}/>
            {isOwner && <input
                type={"file"}
                onChange={mainPhotoSelected}
            />}
            <ProfileStatusWithHooks
                status={status}
                updateStatus={updateStatus}
            />
            {editMode ?
                <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                <ProfileData isOwner={isOwner} goToEditMode={goToEditMode}
                             fullName={profile.fullName} lookingForAJob={profile.lookingForAJob}
                             lookingForAJobDescription={profile.lookingForAJobDescription}
                             aboutMe={profile.aboutMe} contacts={profile.contacts}/>}
        </div>
    )
}

type ProfileDataType = {
    isOwner?: boolean
    goToEditMode?: () => void
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
    }
}

const ProfileData = (props: ProfileDataType) => {
    return <>
        {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name</b>: {props.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {props.lookingForAJob ? "yes" : "no"}
        </div>
        {props.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {props.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {props.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:<br/>
            <b>-My <a href={props.contacts.github || ""}>github</a> profile</b><br/>
            <b>-My <a href={props.contacts.vk || ""}>vk</a> profile</b><br/>
            <b>-My <a href={props.contacts.facebook || ""}>facebook</a> profile</b><br/>
            <b>-My <a href={props.contacts.instagram || ""}>instagram</a> profile</b><br/>
            <b>-My <a href={props.contacts.mainLink || ""}>portfolio</a></b><br/>
            <b>-My <a href={props.contacts.twitter || ""}>twitter</a> profile</b><br/>
            <b>-My <a href={props.contacts.website || ""}>website</a></b><br/>
            <b>-My <a href={props.contacts.youtube || ""}>youtube</a></b><br/>
        </div>
    </>
}

export default ProfileInfo;