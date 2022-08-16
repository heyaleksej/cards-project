import React, {useEffect} from 'react';
import './App.module.css';
import Main from "../main/Main";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./hooks";
import {initializeAppTC} from "./app-reducer";
import {ErrorSnackbar} from "../main/common/ErrorSnackbar/ErrorSnackbar";
import s from './App.module.css'

const App = () => {

    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector((state) => state.app.initialized)

    useEffect(() => {
        if (!isInitialized){
        dispatch(initializeAppTC())
        }
    }, [dispatch])

    if (!isInitialized) {
        return <div>
            <CircularProgress sx={{
                color: 'seagreen',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'}} />
        </div>
    }



    return (
        <div className={s.app}>
            <ErrorSnackbar/>
            <Main/>
        </div>
    );
}

export default App;
