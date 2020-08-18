import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type PropsUsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: string) => void
    unfollow: (id: string) => void
    followingInProgress: string[]
}

let Users = (props: PropsUsersType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let  i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return  <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage: '' }
                             onClick={(e) => {props.onPageChange(p)}}
                >{`-${p}-`}</span>

            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img alt={'ava'} src={u.photos.small !== null ? u.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {props.unfollow(u.id)}}
                            >Unfollow</button> :
                            <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {props.follow(u.id)}}
                            >Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
            </div>)
        }
    </div>
}

export default Users;
