import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
});

export type RootState = ReturnType<typeof reducers>;

let store: Store = createStore(reducers);

// @ts-ignore
window.store = store;

export default store;