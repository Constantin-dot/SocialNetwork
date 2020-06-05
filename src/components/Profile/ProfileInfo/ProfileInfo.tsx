import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUhwe-8xP7nhoZdkOpDpsCI2gctp9J_XTmSYBSy6twumMhKRmi&usqp=CAU' alt={'background'}></img></div>
            <div className={classes.descriptionBlock}>ava+description</div>
        </div>
    )
}

export default ProfileInfo;