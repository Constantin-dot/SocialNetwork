import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={classes.content}>
            <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUhwe-8xP7nhoZdkOpDpsCI2gctp9J_XTmSYBSy6twumMhKRmi&usqp=CAU' alt={'background'} /></div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;