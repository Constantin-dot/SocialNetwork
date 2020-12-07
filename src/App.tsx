import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {RootState} from "./redux/redux-store";
import Preloader from "./components/common/preloader/Preloader";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type AppType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<AppType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: Event) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <React.Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route exact path={'/'} component={() => <Redirect to={"/profile"}/>} />
                            <Route path={'/dialogs'} component={DialogsContainer}/>
                            <Route path={'/profile/:userId?'} component={ProfileContainer}/>
                            <Route path={'/users'} component={UsersContainer}/>
                            <Route path={'/login'} component={Login}/>
                            <Route path={'*'} component={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </React.Suspense>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state: RootState):MapStatePropsType => ({initialized: state.app.initialized})

let AppContainer =  compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
  ) (App);

const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;