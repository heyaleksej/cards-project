import {HashRouter} from "react-router-dom";
import Header from "./header/Header";
import React from "react";
import {useAppSelector} from "../app/hooks";
import {LinearProgress} from "@mui/material";
import Pages from "./routes/Pages";

const Main = () => {

    const status = useAppSelector(state => state.app.status)

    return (
            <HashRouter>

                <Header/>
                {status === 'loading' && <LinearProgress sx={{overflowY: 'hidden', marginTop: '-4px', background:'seagreen'}} />}
                <Pages/>

            </HashRouter>
    )
}

export default Main