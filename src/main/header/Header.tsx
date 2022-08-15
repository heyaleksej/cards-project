import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import style from './Header.module.css'
import {useAppSelector} from "../../app/hooks";
import { Avatar } from '@mui/material';
import defaultAvatar from '../pages/profile/Sample_User_Icon.png'
import AppLogo from './../common/img/educational-flash-cards.png'


function Header() {

    const islogin = useAppSelector(state => state.login.isLogin)
    const imgFromServer = useAppSelector(state => state.profile.profile.avatar)
    const userName = useAppSelector(state => state.profile.profile.name)
    const ava = imgFromServer ? imgFromServer : defaultAvatar

    return (<>
            {!islogin
                ? <header className={style.header}>
                <ul className={style.header__list}>
                    <>
                        <img className={style.logo} src={AppLogo} alt={'logo'}/>
                        <h1 className={style.title}>Cards App</h1>
                    </>
                    <li>
                        <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.LOGIN}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PROFILE}>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.SET_PASSWORD}>Set password</NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PACKS}>Packs</NavLink>
                    </li>
                </ul>
            </header>
                : <header className={style.header}>
                    <ul className={style.header__list}>

                        <li>
                            <NavLink to={PATH.SET_PASSWORD}>Set password</NavLink>
                        </li>

                        <li>
                            <NavLink to={PATH.PACKS}>Packs</NavLink>
                        </li>

                        <li>
                            <NavLink to={PATH.PROFILE}>{userName} <Avatar sx={{marginLeft:'5px'}} alt="ava" src={ava} />
                            </NavLink>
                        </li>
                    </ul>
                </header>

            }
        </>
    )
}

export default Header;