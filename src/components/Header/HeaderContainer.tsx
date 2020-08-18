import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {getUserData} from "../../redux/auth-reducer";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    getUserData: () => void
}

type HeaderContainerType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.getUserData();
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} />
    }

}

let mapStateToProps = (state: RootState):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {getUserData})(HeaderContainer);