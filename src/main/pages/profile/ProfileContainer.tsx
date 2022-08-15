import React, {useCallback} from 'react';
import {editProfileTC, logOutTC, ProfileType} from "./profileReducer";
import {Navigate} from 'react-router-dom';
import {PATH} from "../../routes/Routes";
import { RequestStatusType } from '../../../app/app-reducer';
import Profile from './Profile';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";


export const ProfileContainer = () => {

    const dispatch = useAppDispatch()
    const isLogin = useAppSelector<boolean>(state => state.login.isLogin)
    const profile = useAppSelector<ProfileType>(state => state.profile.profile)
    const status = useAppSelector<RequestStatusType>(state => state.profile.status)



    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])

    const activateEditMode = useCallback((name: string | null) => {
        dispatch(editProfileTC(name))
    }, [dispatch])




    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }


    return (
        <div>
            <Profile profile={profile} logOutHandler={logOutHandler} EditMode={activateEditMode} status={status}/>
        </div>
    )
}
