import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {deletePackTC, fetchCardPacks, updatePackTC} from "../packsListReducer";
import {setProfileIdAC} from "../../profile/profileReducer";
import {Packs} from "../Packs";
import {setUserCardId, setUserCardName} from "../../cards/cardsReducer";


export const PacksList = () => {
    const dispatch = useAppDispatch(),
        isLoggedIn = useAppSelector(state => state.login.isLogin),
        page = useAppSelector(state => state.tablePacks.page),
        pageCount = useAppSelector(state => state.tablePacks.pageCount),
        searchPackName = useAppSelector(state => state.tablePacks.packName),
        sortPackName = useAppSelector(state => state.tablePacks.sortPacks),
        commonUserId = useAppSelector(state => state.tablePacks.user_id),
        commonMin = useAppSelector(state => state.tablePacks.min),
        commonMax = useAppSelector(state => state.tablePacks.max),
        packId = useAppSelector(state => state.cardPack.cardsPack_id),
        myId = useAppSelector(state => state.profile.profile._id),
        status = useAppSelector(state => state.app.status),
        cardPacks = useAppSelector(state => state.packList.cardPacks),
        totalCardsCount = useAppSelector(state => state.packList.cardPacksTotalCount);


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

    const updatePack = (packId: string, value: string) => dispatch(updatePackTC(packId, value))
    const deletePack = (packId: string) => dispatch(deletePackTC(packId))
    const SendPackId = (_id: string, name: string) => {
        dispatch(setUserCardId(_id));
        dispatch(setUserCardName(name))
    }


    return (

        <div className={styles.packsContainer}>
            <Packs status={status}
                   getAllPacks={getAllPacks}
                   getOnlyMyPacks={getOnlyMyPacks}
                   myId={myId}
                   packId={packId}
                   cardPacks={cardPacks}
                   totalCardsCount={totalCardsCount}
                   page={page}
                   pageCount={pageCount}
                   updatePack={updatePack}
                   SendPackId={SendPackId}
                   deletePack={deletePack}/>
        </div>
    )
};