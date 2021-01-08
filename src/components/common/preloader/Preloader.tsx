// import loader from "../../../assets/images/loader.gif";
// import styles from ".//Preloader.module.css";
import React from "react";
import {LoadingOutlined} from '@ant-design/icons';

let Preloader: React.FC = () => {
    return <div style={{ fontSize: "50px" }}>
        <LoadingOutlined />
    </div>
}
//<img src={loader} alt={'loader'} className={styles.preloader}/>
export default Preloader