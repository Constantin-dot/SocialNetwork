import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";


type ProfileInfoPropsType = {
    profile: ProfileType | null
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUhwe-8xP7nhoZdkOpDpsCI2gctp9J_XTmSYBSy6twumMhKRmi&usqp=CAU' alt={'background'} /></div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large} alt={"large user's ava"}/>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.contacts.facebook}</div>
                <div>{props.profile.contacts.vk}</div>
                <div>{props.profile.contacts.github}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;