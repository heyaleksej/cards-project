import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {addPackTC, deletePackTC, fetchCardPacks, updatePackTC} from "../packsListReducer";
import {setProfileIdAC} from "../../profile/profileReducer";
import {Packs} from "../Packs";


export const PacksList = () => {
    const dispatch = useAppDispatch();


    const isLoggedIn = useAppSelector(state => state.login.isLogin);
    const page = useAppSelector(state => state.tablePacks.page);
    const pageCount = useAppSelector(state => state.tablePacks.pageCount);
    const searchPackName = useAppSelector(state => state.tablePacks.packName);
    const sortPackName = useAppSelector(state => state.tablePacks.sortPacks);
    const commonUserId = useAppSelector(state => state.tablePacks.user_id);
    const commonMin = useAppSelector(state => state.tablePacks.min);
    const commonMax = useAppSelector(state => state.tablePacks.max);
    const myId = useAppSelector(state => state.profile.profile._id)
    const status = useAppSelector(state => state.app.status)


    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page, pageCount, sortPackName, searchPackName, commonUserId, commonMin, commonMax]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const getAllPacks = () => {
        dispatch(setProfileIdAC(null))
        dispatch(fetchCardPacks())
    }

    const getOnlyMyPacks = () => {
        dispatch(setProfileIdAC(myId))
        dispatch(fetchCardPacks())
    }

    const addPackHandler = () => {
        dispatch(addPackTC('newPack'))
    }

    const deletePack = (title: string) => {
        dispatch(deletePackTC(title))

    }
    const changeName = (packId: string) => {
        dispatch(updatePackTC(packId, '!newPackName!'))
    }




    return (

        <div className={styles.packsContainer}>
            <Packs status={status}
                   getAllPacks={getAllPacks}
                   getOnlyMyPacks={getOnlyMyPacks}
                   addPackHandler={addPackHandler}
                   deletePack={deletePack}
                   changeName={changeName}/>

        </div>

    )
};