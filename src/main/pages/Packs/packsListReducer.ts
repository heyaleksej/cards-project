import {AxiosError} from 'axios';
import {AppStoreType, AppThunk} from "../../../app/store";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";
import {Dispatch} from "redux";
import {packsAPI, PacksParamsResponseType, PackType} from "../../../api/cards&packsAPI/PacksAPI";

const initialState: PacksListStateType = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    packName: '',
    packId: '',
}

export const packsListReducer = (state: PacksListStateType = initialState, action: PacksListActionsType): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST/SET-PACKS-LIST-PARAMS':
        case 'PACKS-LIST/SET-PACK-MODAL-PARAMS':
            return {...state, ...action.data};
        default:
            return state;
    }
};

const setPacksListData = (data: PacksParamsResponseType) => ({
    type: 'PACKS-LIST/SET-PACKS-LIST-PARAMS',
    data,
} as const);
export const setPackModalParams = (data: { packId: string, packName?: string }) => ({
    type: 'PACKS-LIST/SET-PACK-MODAL-PARAMS',
    data,
} as const);


export const fetchCardPacks = (): AppThunk => (dispatch: Dispatch, getState: () => AppStoreType) => {
    const {pageCount, page, packName, sortPacks, min, max} = getState().tablePacks;
    const user_id = getState().profile.myId

    let tableParams = {
        packName,
        sortPacks,
        page,
        pageCount,
        min,
        max
    }

    const params = {...tableParams, user_id}


    dispatch(getStatusAC('loading'));
    packsAPI.getPacks( params)
        .then(res => {
            dispatch(setPacksListData(res.data));

        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            console.log(error)        })
        .finally(() => {
            dispatch(getStatusAC('idle'));
        })
}

export const addPackTC = (name: string): AppThunk => (dispatch, getState) => {
    dispatch(getStatusAC('loading'))
    packsAPI.addPack({name})
        .then(response => {
            console.log(response)
            dispatch(fetchCardPacks())
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export const deletePackTC = (packId: string | null): AppThunk => (dispatch) => {
    dispatch(getStatusAC('loading'))
    packsAPI.deletePack(packId)
        .then(() => {dispatch(fetchCardPacks())})
        .catch((e: AxiosError<{ error: string }>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export const updatePackTC = (packId: string, name: string): AppThunk => (dispatch, getState) => {
    dispatch(getStatusAC('loading'))
    const newPack = {
        _id: packId,
        name: name
    }

    packsAPI.updatePack(newPack)
        .then(() => {
            dispatch(fetchCardPacks())
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = (e.response && e.response.data) ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export type PacksListActionsType = ReturnType<typeof setPacksListData> | ReturnType<typeof setPackModalParams>

type PacksListStateType = PacksParamsResponseType & {
    packName: string
    packId: string
}