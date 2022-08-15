import * as React from 'react';
import {useEffect} from 'react';
import styles from './tableCardName.module.css';
import {fetchCardsTC} from "../cardsReducer";
import {TableCard} from "./TableCard";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";

export const TableCardName = () => {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector(state => state.login.isLogin);
	const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id);
	const page = useAppSelector(state => state.cardPack.page);
	const pageCount = useAppSelector(state => state.cardPack.pageCount);
	const cardQuestion = useAppSelector(state => state.cardPack.cardQuestion);
	const cardAnswer = useAppSelector(state => state.cardPack.cardAnswer);
	const sortCards = useAppSelector(state => state.cardPack.sortCards);
	const minCards = useAppSelector(state => state.cardPack.min);
	const maxCards = useAppSelector(state => state.cardPack.max);

	useEffect(() => {
		console.log('cpid', cardsPack_id)
		if (cardsPack_id) {
			dispatch(fetchCardsTC());
		}
	},[cardsPack_id, page, pageCount, cardQuestion, cardAnswer, sortCards, minCards, maxCards])

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN}/>
	}

	if (!cardsPack_id) {
		return <Navigate to={PATH.PACKS}/>
	}

	return (
		<div className={styles.container}>
			<TableCard/>
		</div>
	)
}