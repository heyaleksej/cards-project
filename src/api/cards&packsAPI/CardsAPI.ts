import {AxiosResponse} from 'axios';
import { instance } from '../instance/instance';

type newCardType = {
	cardsPack_id: string,
	question?: string,
	answer?: string
}

type updateCardType = {
	_id: string,
	question?: string,
	answer?: string
}

export const cardsAPI = {
	getCards(data: CardParamsType) {
		return instance.get<any, AxiosResponse<CardsTypeResponseType>, CardParamsType>('cards/card', {params: data});
	},
	addNewCard(newCard: newCardType) {
		return  instance.post('cards/card', {card: newCard}).then(res=>res.data)
	},
	updateCard (updateCard: updateCardType) {
		return instance.put('cards/card', {card: updateCard}).then(res=>res.data)
	},
	deleteCard (cardsPack_id: string) {
		return instance.delete(`cards/card?id=${cardsPack_id}` ).then(res=>res.data)
	}
}

//types
export type CardParamsType = {
	cardAnswer?: string
	cardQuestion?: string
	cardsPack_id: string
	min?: number
	max?: number
	sortCards?: string
	page?: number
	pageCount?: number
}

export type CardsTypeResponseType = {
	cards: CardType[]
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
	token: string
	tokenDeathTime: number
}

export type CardType = {
	answer: string
	question: string
	cardsPack_id?: string
	grade: number
	shots?: number
	user_id?: string
	created?: string
	updated: string
	_id: string
}