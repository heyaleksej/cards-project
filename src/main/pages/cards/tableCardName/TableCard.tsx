import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {addCardTC, setCardsPage, setCardsPageCount, setSearchQuestion} from '../cardsReducer';
import {useNavigate} from 'react-router-dom';
import {TableContainerCards} from './TableContainerCards';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import Button from '@mui/material/Button';
import {ChangeEvent, useEffect, useState} from "react";
import {ModalCard} from "../../../common/Modal/ModalCard";
import st from '../../packs/Packs.module.css'
import {Search} from "../../../common/Search/Search";
import useDebounce from "../../../utils/useDebounce";
import { PaginationComponent } from '../../packs/Pagination/PaginationComponent';

export const TableCard = () => {
    const dispatch = useAppDispatch(), navigate = useNavigate(),
        myId = useAppSelector(state => state.profile.profile._id), page = useAppSelector(state => state.cardPack.page),
        totalCardsCount = useAppSelector(state => state.cardPack.cardsTotalCount),
        pageCount = useAppSelector(state => state.cardPack.pageCount),
        packName = useAppSelector(state => state.cardPack.name),
        packUserId = useAppSelector(state => state.cardPack.packUserId),
        cardsPackId = useAppSelector(state => state.cardPack.cardsPack_id),
        status = useAppSelector(state => state.app.status), [value, setValue] = useState(''), [activeModal, setActiveModal] = useState<boolean>(false), [question, setQuestion] = useState<string>(''), [answer, setAnswer] = useState<string>(''),
        debouncedValue = useDebounce<string>(value, 500);


    useEffect(() => {
        dispatch(setSearchQuestion(debouncedValue));
        dispatch(setCardsPage(1));
    }, [debouncedValue])

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const addNewCardHandler = () => {
        dispatch(addCardTC(cardsPackId, question, answer))
        closeModal()
        setQuestion('')
        setAnswer('')
    }

    const onChangePageHandler = (page: number) => {
        dispatch(setCardsPage(page));
    }

    const onChangePageCountHandler = (value: number) => {
        dispatch(setCardsPageCount(value));
        dispatch(setCardsPage(1));
    }

    const onChangeNavigateHandler = () => {
        if (status === 'idle') {
            navigate(-1);
        }
    }

    const onChangeTextAddHandlerFirst = (value: string) => {setQuestion(value)}
    const onChangeTextAddHandlerSecond = (value: string) => {setAnswer(value)}

    const closeModal = () => setActiveModal(false)


    return (
        <>
            <div>
                <span className={st.Addcardbtn}>
                    <>
                        <IconButton disabled={status === 'loading'} onClick={onChangeNavigateHandler}>
                             <ArrowBackIcon fontSize='large'/>
                        </IconButton>
                    </>
                <h2>{packName}</h2>

                    <div>
                        <Button size='large' color='success' variant="contained" onClick={() => {
                            setActiveModal(true)
                        }} disabled={myId !== packUserId || status === 'loading'}>Add card</Button>
                    </div>
                </span>

                {activeModal && <ModalCard onChangeQuestion={onChangeTextAddHandlerFirst}
                                           onChangeAnswer={onChangeTextAddHandlerSecond}
                                           closeModal={closeModal}
                                           question={question}
                                           answer={answer}
                                           addTextHandler={addNewCardHandler}
                                           title='Please, enter the question and answer'
                                           cardId={cardsPackId}
                                           packId={cardsPackId}
                />}
            </div>
            <Search value={value} callback={changeValueHandler}/>
            <TableContainerCards/>
            <div>
                <PaginationComponent
                    page={page}
                    pageCount={pageCount}
                    totalCardsCount={totalCardsCount}
                    onChangePage={onChangePageHandler}
                    onChangeValue={onChangePageCountHandler}
                    disable={status === 'loading'}
                    title="Cards per Page"
                />
            </div>
        </>
    )
};