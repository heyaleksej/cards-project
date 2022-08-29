import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Page404 from "../pages/page_404/Page404";
import ForgotPassword from "../pages/fogotPassword/ForgotPassword";
import Login from "../pages/login/Login";
import SetPassword from "../pages/setPassword/SetPassword";
import {ProfileContainer} from "../pages/profile/ProfileContainer";
import {PacksList} from "../pages/packs/PacksList/PacksList";
import {CardsList} from "../pages/cards/tableCardName/CardsList";
import { LearnPack } from '../pages/packs/PacksTable/learnPack/LearnPack';
import {RegContainer} from "../pages/registration/RegContainer";

export const PATH = {
    REGISTRATION: '/register',
    LOGIN: '/login',
    PROFILE: '/profile',
    PAGE404: '/page404',
    FORGOT_PASSWORD: '/forgot-password',
    SET_PASSWORD: '/set-password/:token',
    SUPER_COMPONENTS: '/super-components',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN_PACK: 'learn-pack/:id',

}

function Pages() {
    return (
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.REGISTRATION} element={<RegContainer/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.PROFILE} element={<ProfileContainer/>}/> // profile container first
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={PATH.SET_PASSWORD} element={<SetPassword/>}/>
                <Route path={PATH.PACKS} element={<PacksList/>}/>
                <Route path={PATH.CARDS + `/:id`} element={<CardsList/>}/>
                <Route path={PATH.PAGE404} element={<Page404/>}/>
                <Route path={'/*'} element={<Page404/>}/>
                <Route path={PATH.LEARN_PACK} element={<LearnPack/>}/>



            </Routes>
    )
}

export default Pages