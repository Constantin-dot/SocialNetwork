import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";

const App = () => {

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path={'/dialogs'} component={DialogsContainer}/>
                <Route path={'/profile/:userId?'} component={ProfileContainer}/>
                <Route path={'/users'} component={UsersContainer}/>
                <Route path={'/login'} component={Login}/>
            </div>
        </div>
    );
}

export default App;
