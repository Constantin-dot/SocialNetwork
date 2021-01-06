import {useSelector} from "react-redux";
import React from "react";
import Preloader from "../common/preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";

type PropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users/>
    </>
}
