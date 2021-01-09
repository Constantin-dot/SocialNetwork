import React from 'react';
import './App.module.css';
import {BrowserRouter, Route, Switch, Redirect, Link} from "react-router-dom";
import {LoginPage} from "./components/login/LoginPage";
import {connect, Provider} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/common/preloader/Preloader";
import {UsersPage} from "./components/Users/UsersPage";
import "antd/dist/antd.css";
import {Layout, Menu} from 'antd';
import {
    SmileTwoTone,
    MessageTwoTone,
    ContactsTwoTone,
    BellTwoTone,
    CustomerServiceTwoTone,
    SettingTwoTone,
} from '@ant-design/icons';
import Header from "./components/Header/Header";

const {Content, Footer, Sider} = Layout

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"))

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

    state = {
        collapsed: false,
    }

    onCollapse = (collapsed: boolean) => {
        console.log(collapsed)
        this.setState({collapsed})
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        const {collapsed} = this.state

        return (
            // <div className='app-wrapper'>
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className='app-wrapper-content'>
            //         <React.Suspense fallback={<Preloader/>}>
            //             <Switch>
            //                 <Route exact path={'/SocialNetwork'} render={() => <Redirect to={"/profile"}/>} />
            //                 <Route path={'/dialogs'} render={() => <DialogsContainer />}/>
            //                 <Route path={'/profile/:userId?'} render={() => <ProfileContainer />}/>
            //                 <Route path={'/users'} render={() => <UsersPage pageTitle={"Samurais"}/>}/>
            //                 <Route path={'/login'} render={() => <LoginPage />}/>
            //                 <Route path={'*'} render={() => <div>404 NOT FOUND</div>}/>
            //             </Switch>
            //         </React.Suspense>
            //     </div>
            // </div>

            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<SmileTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<MessageTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/dialogs">Messages</Link>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<MessageTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/chat">Chat</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContactsTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/users">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<BellTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<CustomerServiceTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/music">Music</Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<SettingTwoTone twoToneColor="#ff4609" style={{ fontSize: "30px"}}/>}>
                            <Link to="/settings">Settings</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header />
                    <Content style={{margin: '0 16px'}}>
                        <React.Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route exact path={'/SocialNetwork'} render={() => <Redirect to={"/profile"}/>}/>
                                <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                                <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                                <Route path={'/users'} render={() => <UsersPage pageTitle={"Samurais"}/>}/>
                                <Route path={'/login'} render={() => <LoginPage/>}/>
                                <Route path={'/chat'} render={() => <ChatPage/>}/>
                                <Route path={'*'} render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </React.Suspense>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Developers Social Network ©2021 Created by Konstantin Karelin</Footer>
                </Layout>
            </Layout>
        )
    }
}




const mapStateToProps = (state: AppStateType): MapStatePropsType => ({initialized: state.app.initialized})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp