import React from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./user/User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
    followingInProgress: number[]
}

const Users: React.FC<UsersPropsType> = ({totalUsersCount, pageSize,
                                             currentPage, onPageChanged, users, ...props}) => {

    return  <div>
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        </div>
        <Paginator
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
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
