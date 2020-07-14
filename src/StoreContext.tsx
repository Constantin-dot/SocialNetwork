import React from "react";
import store from "./redux/redux-store";
import {Store} from "redux";

const StoreContext = React.createContext<Store>(store);

export const StoreContextProvider = StoreContext.Provider;

export const StoreContextConsumer = StoreContext.Consumer;