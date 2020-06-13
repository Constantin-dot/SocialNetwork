import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../index";

type ProfilePropsType = {
    profilePage: ProfilePageType
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}/>
        </div>
    )
}

export default Profile;