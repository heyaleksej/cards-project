import {HashRouter} from "react-router-dom";
import Routes from "./Routes/Routes";
import Header from "./Header/Header";
import React from "react";
import {useAppSelector} from "../app/hooks";
import {LinearProgress} from "@mui/material";

const Main = () => {

    const status = useAppSelector(state => state.app.status)

    return (
        <>
            <HashRouter>

                <Header/>
                {status === 'loading' && <LinearProgress color="secondary" />}
                <Routes/>

            </HashRouter>
        </>
    )
}

export default Main