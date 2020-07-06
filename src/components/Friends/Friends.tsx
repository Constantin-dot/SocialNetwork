import React from "react";

import classes from "./Friends.module.css";
import {DialogsPageType, DialogType} from "../../redux/state";


type PropsFriendsType = {
    dialogsPage: DialogsPageType
}

const Friends = (props: PropsFriendsType) => {
    let friendsElements = props.dialogsPage.dialogs.map( (d:DialogType) => <div className={classes.friendsItem} key={d.id}>{d.name}</div>);

    return (
        <div>
            {friendsElements}
        </div>
    )
}

export default Friends;