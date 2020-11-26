import React, {useState} from "react";
import styles from "./Paginator.module.css";
// import cn from "classnames";

type PropsUsersType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onPageChange: (pageNumber: number) => void
}

const Paginator = ({totalItemsCount, pageSize, onPageChange, currentPage, portionSize}: PropsUsersType) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)} }>Previous</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
            return <span className={styles.pageNumber} //cn({[styles.selectedPage] : currentPage === p}, styles.pageNumber)
                         key={p}
                         onClick={(e) => {
                             onPageChange(p)
                         }}
            >{`-${p}-`}</span>
        })}
        {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}
    </div>
}

export default Paginator;
