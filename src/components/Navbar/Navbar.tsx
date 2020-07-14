import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

type NavbarPropsType = {

}

function Navbar(props:NavbarPropsType)  {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
            </div>
            <div className={`${classes.item} ${classes.active}`}>
                <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/news" activeClassName={classes.active}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
            </div>
            {/*<div className={classes.item}>*/}
            {/*    <NavLink to="/friends" activeClassName={classes.active}>Friends</NavLink>*/}
            {/*    <Friends dialogsPage={props.dialogsPage}/>*/}
            {/*</div>*/}
        </nav>
    )
}

export default Navbar;