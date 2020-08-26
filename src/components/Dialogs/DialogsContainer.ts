import {
    addMessageActionCreator,
    DialogsPageType,
    newMessageChangeHandlerActionCreator
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
    addMessage: () => void
    newTextChangeHandler: (text: string) => void
}


let mapStateToProps = (state: RootState) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
        newTextChangeHandler: (text: string) => {
            let action = newMessageChangeHandlerActionCreator(text);
            dispatch(action);
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    // withAuthRedirect
)(Dialogs);