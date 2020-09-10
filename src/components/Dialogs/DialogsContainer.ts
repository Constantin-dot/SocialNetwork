import {
    addMessageActionCreator,
    DialogsPageType,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import React from "react";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchPropsType = {
    addMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: RootState) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: (newMessageBody: string) => {
            dispatch(addMessageActionCreator(newMessageBody));
        },
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps)
    // withAuthRedirect
)(Dialogs);