import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import state from "./redux/state";
import {BrowserRouter} from "react-router-dom";

export type PostsType = {
    id: string
    message: string
    likeCount: number
}

export type DialogsType = {
    id: string
    name: string
}

export type MessagesType = {
    id: string
    message: string
}

export type ProfilePageType = {
    posts: Array<PostsType>
}

export type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

ReactDOM.render(
    <BrowserRouter>
        <App state={state}/>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
