import {actions, DialogsStateType} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export type MapStatePropsType = {
    dialogsPage: DialogsStateType
}

export type MapDispatchPropsType = {
    addMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addMessage: actions.addMessage
    })
    , withAuthRedirect
)(Dialogs)