import React from "react";
import classes from "./Header.module.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import {Avatar, Button, Layout} from 'antd';
import {UserOutlined} from '@ant-design/icons';

type HeaderPropsType = {}

const Header: React.FC<HeaderPropsType> = (props) => {
    const {Header} = Layout

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            <div className={classes.loginBlock}>
                {isAuth
                    ? <div>{login}<Avatar  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    <Button type="primary" size={'large'} onClick={logoutCallback}>
                        Log out
                    </Button></div>
                    : <Button type="primary" size={'large'}>
                        <Link to={'/login'}>Login</Link>
                    </Button>}
            </div>
        </Header>
    )
}

export default Header