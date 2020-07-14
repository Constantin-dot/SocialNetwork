import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
});

export type RootState = ReturnType<typeof reducers>;

let store: Store = createStore(reducers);


export default store;