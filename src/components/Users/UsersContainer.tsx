import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {
    follow, getUsers,
    setCurrentPage, toggleIsFollowingProgress,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export type MapStatePropsType = {
    users:  Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: string[],
}

export type MapDispatchPropsType = {
    follow: (id: string) => void
    unfollow: (id: string) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsUsersContainerType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsUsersContainerType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChange = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: RootState):MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
    {follow, unfollow, setCurrentPage,
        toggleIsFollowingProgress, getUsers}),
    // withAuthRedirect
)(UsersContainer);

