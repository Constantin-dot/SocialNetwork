import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.descriptionBlock}>
            <img src={profile.photos.large} alt={"large user's ava"}/>
            <ProfileStatusWithHooks
                status={status}
                updateStatus={updateStatus}
            />
            <div>{profile.aboutMe}</div>
            <div>{profile.contacts.facebook}</div>
            <div>{profile.contacts.vk}</div>
            <div>{profile.contacts.github}</div>
        </div>
    )
}

export default ProfileInfo;