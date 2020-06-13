import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import { StateType} from "./index";

type AppPropsType ={
    state: StateType
}

const App = (props: AppPropsType) => {

    return (
        <div className='app-wrapper'>
            <Header />
            <Navbar dialogsPage={props.state.dialogsPage}/>
            <div className='app-wrapper-content'>
                <Route path={'/dialogs'} render={() => <Dialogs dialogsPage={props.state.dialogsPage}/>}/>
                <Route path={'/profile'} render={() => <Profile profilePage={props.state.profilePage}/>}/>
            </div>
        </div>
  );
}

export default App;
