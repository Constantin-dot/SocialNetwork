import loader from "../../../assets/images/loader.gif";
import styles from "../../common/Preloader/Preloader.module.css";
import React from "react";

let Preloader = () => {
    return <div>
        <img src={loader} alt={'loader'} className={styles.preloader}/>
    </div>
}

export default Preloader;