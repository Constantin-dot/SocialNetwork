import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={classes.header}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3sSeODBFr_G_SJiCUAT_zTjutwK3Wwi1lswmfH-eSGIwc1Lp4&usqp=CAU' alt='Logo'/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header