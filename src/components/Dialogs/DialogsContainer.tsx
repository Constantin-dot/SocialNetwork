import React from "react";
import {addMessageActionCreator, newMessageChangeHandlerActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {StoreContextConsumer} from "../../StoreContext";

type PropsDialogsContainerType = {

}

const DialogsContainer = (props:PropsDialogsContainerType) => {

    return <StoreContextConsumer>
        { store => {
            let dialogsPage = store.getState().dialogsPage;

            let addMessage = () => {
                store.dispatch(addMessageActionCreator(dialogsPage.newDialogText));
            }

            let newTextChangeHandler = (text: string) => {
                let action = newMessageChangeHandlerActionCreator(text);
                store.dispatch(action);
            }

            return <Dialogs
                addMessage={addMessage}
                newTextChangeHandler={newTextChangeHandler}
                dialogsPage={dialogsPage}
            />
        } }
    </StoreContextConsumer>
}

export default DialogsContainer;