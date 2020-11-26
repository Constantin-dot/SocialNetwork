import React from "react";
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/paginator/Paginator";
import User from "./user/User";

type PropsUsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: string) => void
    unfollow: (id: string) => void
    followingInProgress: string[]
}

let Users = ({totalUsersCount, pageSize, currentPage, onPageChange, users, ...props}: PropsUsersType) => {

    return  <div>
        <Paginator
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            portionSize={10}
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

export default Users;
