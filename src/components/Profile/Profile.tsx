import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={classes.content}>
            <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUhwe-8xP7nhoZdkOpDpsCI2gctp9J_XTmSYBSy6twumMhKRmi&usqp=CAU' alt={'background'}></img></div>
            <div>ava+description</div>
            <MyPosts />
        </div>
    )
}

export default Profile;