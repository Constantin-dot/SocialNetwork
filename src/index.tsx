import './index.css';
import * as serviceWorker from './serviceWorker';
import  {StateType} from "./redux/store";
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {StoreContextProvider} from "./StoreContext";


const renderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContextProvider value={store}>
                <App />
            </StoreContextProvider>
        </BrowserRouter>, document.getElementById('root')
    );
}

renderEntireTree(store.getState());

store.subscribe( () => {
    let state = store.getState();
    renderEntireTree(state);
});

serviceWorker.unregister();
