import React from "react";
import {DialogsPageType, DialogsType} from "../../index";
import classes from "./Friends.module.css";


type PropsFriendsType = {
    dialogsPage: DialogsPageType
}

const Friends = (props: PropsFriendsType) => {
    let friendsElements = props.dialogsPage.dialogs.map( (d:DialogsType) => <div className={classes.friendsItem}>{d.name}</div>);

    return (
        <div>
            {friendsElements}
        </div>
    )
}

export default Friends;