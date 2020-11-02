import React from "react";
import styles from "./Paginator.module.css";

type PropsUsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}

const Paginator = (props: PropsUsersType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p ? styles.selectedPage : ''}
                         onClick={(e) => {
                             props.onPageChange(p)
                         }}
            >{`-${p}-`}</span>

        })}
    </div>
}

export default Paginator;
