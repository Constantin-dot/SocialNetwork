import React from "react";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3sSeODBFr_G_SJiCUAT_zTjutwK3Wwi1lswmfH-eSGIwc1Lp4&usqp=CAU' alt='Logo'></img>
        </header>
    )
}

export default Header;