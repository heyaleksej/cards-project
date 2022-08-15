import axios, {AxiosError} from 'axios';
import {AppStoreType, AppThunk} from "../../../app/store";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";
import {cardsAPI, CardsTypeResponseType, CardType} from '../../../api/cards&packsAPI/CardsAPI';

const initialState: CardsNameStateType = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    cardsPack_id: '',
    cardQuestion: '',
    name: '',
    cardAnswer: '',
    sortCards: '',
    cardId: '',
    question: '',
    answer: '',
    min: 0,
    max: 0,
}

export const cardsNameReducer = (state: CardsNameStateType = initialState, action: CardsNameActionsType): CardsNameStateType => {
    switch (action.type) {
        case 'CARDS-NAME/SET-CARDS-PARAMS':
            return {...state, ...action.data};
        case 'CARDS-NAME/SET-USER-CARD-NAME':
            return {...state, name: action.name};
        case 'CARDS-NAME/SET-CARDS-PAGE':
            return {...state, page: action.page};
        case 'CARDS-NAME/SET-CARDS-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'CARDS-NAME/SET-USER-ID':
            return {...state, cardsPack_id: action.userId};
        case 'CARDS-NAME/SET-SORT-CARDS':
            return {...state, sortCards: action.sortCards};
        case 'CARDS-NAME/SET-CARDS-QUESTION':
            return {...state, cardQuestion: action.searchCardQuestion};
        default:
            return state;
    }
};


export const setUserCardId = (userId: string) => ({
    type: 'CARDS-NAME/SET-USER-ID',
    userId,
} as const);

export const setUserCardName = (name: string) => ({
    type: 'CARDS-NAME/SET-USER-CARD-NAME',
    name,
} as const);

export const getCardsNameData = (data: CardsTypeResponseType) => ({
    type: 'CARDS-NAME/SET-CARDS-PARAMS',
    data,
} as const);

export const setCardsPage = (page: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE',
    page,
} as const);

export const setCardsPageCount = (pageCount: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE-COUNT',
    pageCount,
} as const);

export const setSortCards = (sortCards: string) => ({
    type: 'CARDS-NAME/SET-SORT-CARDS',
    sortCards,
} as const);

export const setSearchQuestion = (searchCardQuestion: string) => ({
    type: 'CARDS-NAME/SET-CARDS-QUESTION',
    searchCardQuestion,
} as const);

export const fetchCardsTC = (): AppThunk => async (dispatch, getState: () => AppStoreType) => {
    const {
        cardsPack_id,
        page,
        pageCount,
        packUserId,
        cardQuestion,
        cardAnswer,
        min,
        max,
        sortCards
    } = getState().cardPack;

    const params = {cardsPack_id, page, pageCount, packUserId, cardQuestion, cardAnswer, min, max, sortCards};

    dispatch(getStatusAC('loading'));

    try {
        const res = await cardsAPI.getCards(params);
        dispatch(getCardsNameData(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        }
    } finally {
        dispatch(getStatusAC('idle'));
    }
}

export const addCardTC: any = (cardsPack_id: string, question?: string, answer?: string): AppThunk => (dispatch) => {
    dispatch(getStatusAC('loading'))
    const newCard = {
        cardsPack_id,
        question,
        answer
    }
    cardsAPI.addNewCard(newCard)
        .then(() => {
            dispatch(fetchCardsTC())
        })
        .catch((err) => {
            console.log(err.response.data.error)
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}


export const deleteCardTC = (packId: string, cardsPack_id: string): AppThunk => (dispatch) => {
    dispatch(getStatusAC('loading'))
    cardsAPI.deleteCard(cardsPack_id)
        .then((res) => {
            dispatch(fetchCardsTC())
        })
        .catch((err) => {
            console.log(err.response.data.error)
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export const updateCardTC = (packId: string, cardId: string, question: string, answer: string): AppThunk => (dispatch) => {
    dispatch(getStatusAC('loading'))
    const updateCard = {
        _id: cardId,
        question,
        answer
    }
    cardsAPI.updateCard(updateCard)
        .then(() => {
            dispatch(fetchCardsTC())
        })
        .catch()
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}



export type CardsNameStateType = CardsTypeResponseType & {
    cardsPack_id: string
    cardQuestion?: string
    name: string
    cardId: string
    question: string
    answer: string
    cardAnswer: string
    sortCards: string
    min: number
    max: number
}

export type CardsNameActionsType =
    | ReturnType<typeof getCardsNameData>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setUserCardId>
    | ReturnType<typeof setUserCardName>
    | ReturnType<typeof setSortCards>
    | ReturnType<typeof setSearchQuestion>

