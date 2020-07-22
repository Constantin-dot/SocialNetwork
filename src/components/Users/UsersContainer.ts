import {connect} from "react-redux";
import Users from "./Users";
import {RootState} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";

export type MapStatePropsType = {
    users:  Array<UserType>
}

export type MapDispatchPropsType = {
    follow: (id: string) => void
    unfollow: (id: string) => void
    setUsers: (user: UserType) => void
}

let mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (id: string) => {
            dispatch(followAC(id));
        },
        unfollow: (id: string) => {
            dispatch(unfollowAC(id));
        },
        setUsers: (user: UserType) => {
            dispatch(setUsersAC(user));
        },
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;