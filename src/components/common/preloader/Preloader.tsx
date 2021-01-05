import loader from "../../../assets/images/loader.gif";
import styles from ".//Preloader.module.css";
import React from "react";

let Preloader: React.FC = () => {
    return <div>
        <img src={loader} alt={'loader'} className={styles.preloader}/>
    </div>
}

export default Preloader