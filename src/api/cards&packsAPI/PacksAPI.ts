import {AxiosResponse} from "axios";
import { instance } from "../instance/instance";


export const packsAPI = {
	getPacks(data: PacksParamsType) {
		return instance.get<PacksParamsResponseType, AxiosResponse<PacksParamsResponseType>, PacksParamsType>(`cards/pack`, {params: data});
	},
	addPack (newPack: any){
		return instance.post('cards/pack', {cardsPack: newPack}).then(response=>response.data)
	},
	deletePack (PackId: string | null) {
		return instance.delete(`cards/pack?id=${PackId}`).then(response=>response.data)
	},
	updatePack (updatePack: any) {
		return instance.put('cards/pack', {cardsPack: updatePack}).then(response=>response.data)
	}
}

//types
export type PackType = {
	_id: string
	user_id: string
	user_name: string
	private: false
	name: string
	path: string
	grade: number
	shots: number
	cardsCount: number
	type: string
	rating: number
	created: string
	updated: string
	more_id: string
	__v: number
}
export type PacksParamsType = {
	packName: string
	min?: number
	max?: number
	sortPacks: string
	page: number
	pageCount: number
	user_id?: string | null
}
export type PacksParamsResponseType = {
	cardPacks: PackType[]
	page: number
	pageCount: number
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number
	token: string
	tokenDeathTime: number
}

