import React, {ChangeEvent, useState} from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.png";
import ProfileDataReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";


type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
        // setEditMode(false)
    }

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={classes.descriptionBlock}>
            <img src={profile.photos.large || userPhoto} alt={"large user's ava"}/>
            {isOwner && <input
                type={"file"}
                onChange={onMainPhotoSelected}
            />}
            <ProfileStatusWithHooks
                status={status}
                updateStatus={updateStatus}
            />
            {editMode ?
                <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                <ProfileData
                    isOwner={isOwner}
                    goToEditMode={goToEditMode}
                    profile={profile}
                />}
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner?: boolean
    goToEditMode?: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {
            Object
                .keys(profile.contacts)
                .map((key) => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
        </div>
    </>
}

type ContactsPropsType = {
    contactTitle: string | null
    contactValue: string | null
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div ><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo