import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {setUserData, UserDataType} from "../../redux/auth-reducer";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    setUserData:(data: UserDataType) => void
}

type HeaderContainerType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    this.props.setUserData({id, login, email});
                }
            });
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} />
    }

}

let mapStateToProps = (state: RootState):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setUserData})(HeaderContainer);