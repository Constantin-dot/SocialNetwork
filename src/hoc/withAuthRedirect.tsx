import React from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export function withAuthRedirect(Component: React.ComponentType) {

    function RedirectComponent(props: MapStatePropsType) {
            let {isAuth, ...restProps} = props
            if (!props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...restProps }/>

    }

    return connect(mapStateToProps)(RedirectComponent)
}
