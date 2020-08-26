import React from "react";
import {Redirect} from "react-router-dom";
import {RootState} from "../redux/redux-store";
import {connect} from "react-redux";
import {compose} from "redux";

type MapStatePropsType = {
    isAuth: boolean
}

type ComponentType = {

}

let mapStateToProps = (state: RootState):MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
};

export const withAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<MapStatePropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>;
            return <Component {...this.props}/>
        }
    }
    compose<React.ComponentType>(
        connect(mapStateToProps)
    )(RedirectComponent);
    // let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    //
    // return ConnectedAuthRedirectComponent;
}
