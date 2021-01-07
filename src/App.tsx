import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import {LoginPage} from "./components/login/LoginPage";
import {connect, Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/preloader/Preloader";
import {UsersPage} from "./components/Users/UsersPage";

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
    catchAllUnhandledErrors = () => {
        alert("Some error occurred")
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
                            <Route exact path={'/SocialNetwork'} render={() => <Redirect to={"/profile"}/>} />
                            <Route path={'/dialogs'} render={() => <DialogsContainer />}/>
                            <Route path={'/profile/:userId?'} render={() => <ProfileContainer />}/>
                            <Route path={'/users'} render={() => <UsersPage pageTitle={"Samurais"}/>}/>
                            <Route path={'/login'} render={() => <LoginPage />}/>
                            <Route path={'*'} render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state: AppStateType):MapStatePropsType => ({initialized: state.app.initialized})

let AppContainer =  compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
  ) (App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp