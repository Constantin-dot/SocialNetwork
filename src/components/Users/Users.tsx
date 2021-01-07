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
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}

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
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: parsed.friend === "null"}
                break
            case "true":
                actualFilter = {...actualFilter, friend: parsed.friend === "true"}
                break
            case "false":
                actualFilter = {...actualFilter, friend: parsed.friend === "false"}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)


        history.push({
            pathname: "/users",
            search: queryString.stringify(query) //`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

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

    return  <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
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
