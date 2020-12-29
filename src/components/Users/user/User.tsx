import React from "react";
import styles from "./User.module.css";
import userPhoto from "../../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../types/types";

type PropsUsersType = {
    user: UserType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: number[]
}

let User = ({user, followingInProgress, follow, unfollow}: PropsUsersType) => {

    return <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img alt={'ava'}
                         src={user.photos.small !== null ? user.photos.small : userPhoto}
                         className={styles.userPhoto}
                    />
                </NavLink>
            </div>
            <div>
                {user.followed ?
                    <button
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}
                            >Unfollow</button> :
                            <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}
                            >Follow</button>
                        }
            </div>
        </span>
        <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
        </span>
    </div>
}

export default User
