import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatus from "./ProfileStatus";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.descriptionBlock}>
            <img src={props.profile.photos.large} alt={"large user's ava"}/>
            <ProfileStatus
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.contacts.facebook}</div>
            <div>{props.profile.contacts.vk}</div>
            <div>{props.profile.contacts.github}</div>
        </div>
    )
}

export default ProfileInfo;