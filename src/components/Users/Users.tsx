import React, {useEffect} from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./user/User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";

type UsersPropsType = {

}

export const Users: React.FC<UsersPropsType> = (props) => {

    const followingInProgress = useSelector(getFollowingInProgress)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)

    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (id: number) => {
        dispatch(follow(id))
    }

    const unfollow = (id: number) => {
        dispatch(unfollow(id))
    }

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    return  <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
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
                follow={follow}
                unfollow={unfollow}
                followingInProgress={followingInProgress}
            />)
        }
    </div>
}
