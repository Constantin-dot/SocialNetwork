import {addMessageActionCreator, newMessageChangeHandlerActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/store";
import {Dispatch} from "redux";


export type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchPropsType = {
    addMessage: () => void
    newTextChangeHandler: (text: string) => void
}


let mapStateToProps = (state: RootState) => {
    return {
        dialogsPage: state.dialogsPage
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;