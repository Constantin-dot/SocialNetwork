import React from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./user/User";
import {UserType} from "../../types/types";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: number[]
}

const Users: React.FC<UsersPropsType> = ({totalUsersCount, pageSize,
                                             currentPage, onPageChange, users, ...props}) => {

    return  <div>
        <Paginator
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
        />
        {
            users.map(u => <User
                key={u.id}
                user={u}
                follow={props.follow}
                unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}
            />)
        }
    </div>
}

export default Users
