import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string | undefined
}

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string | undefined) => void
    getStatus: (userId: string | undefined) => void
    updateStatus: (status: string) => void
}

type ProfileContainerType = MapStatePropsType & MapDispatchPropsType;

type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType;

class ProfileContainer extends React.Component<CommonPropsType>{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {

        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state: RootState):MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);
