import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import Header from "./header/Header";
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