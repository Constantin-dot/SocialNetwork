import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string | undefined
}

type MapStatePropsType = {
    profile: ProfileType | null

}

type MapDispatchPropsType = {
    setUserProfile:(profile: ProfileType | null) => void
}

type ProfileContainerType = MapStatePropsType & MapDispatchPropsType;

type CommonPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType;

class ProfileContainer extends React.Component<CommonPropsType>{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        // if (!userId) {
        //     userId = 2;
        // }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: RootState):MapStatePropsType => ({
    profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);
