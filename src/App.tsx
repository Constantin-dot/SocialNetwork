import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import {ActionType, StateType} from "./redux/store";



type AppPropsType ={
    state: StateType
    dispatch: (action: ActionType) => void
}

const App = (props: AppPropsType) => {

    return (
        <div className='app-wrapper'>
            <Header />
            <Navbar dialogsPage={props.state.dialogsPage}/>
            <div className='app-wrapper-content'>
                <Route path={'/dialogs'} render={() =>
                    <Dialogs
                        dialogsPage={props.state.dialogsPage}
                        newDialogsText={props.state.dialogsPage.newDialogText}
                        dispatch={props.dispatch}
                    />
                }/>
                <Route path={'/profile'} render={() =>
                    <Profile
                        profilePage={props.state.profilePage}
                        dispatch={props.dispatch}
                    />
                }/>
            </div>
        </div>
  );
}

export default App;
