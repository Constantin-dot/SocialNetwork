import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login}
            logout={this.props.logout}
        />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapStatePropsType, MapDispatchPropsType,
    {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer)