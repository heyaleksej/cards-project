import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {addCardTC} from '../cardsReducer';
import {useNavigate} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import Button from '@mui/material/Button';
import {useState} from "react";
import {ModalCard} from "../../../common/Modal/ModalCard";
import st from '../../packs/Packs.module.css'

export const Cards = () => {
    const dispatch = useAppDispatch(), navigate = useNavigate(),
        myId = useAppSelector(state => state.profile.profile._id),
        packName = useAppSelector(state => state.cardPack.name),
        packUserId = useAppSelector(state => state.cardPack.packUserId),
        cardsPackId = useAppSelector(state => state.cardPack.cardsPack_id),
        status = useAppSelector(state => state.app.status),
        [activeModal, setActiveModal] = useState<boolean>(false),
        [question, setQuestion] = useState<string>(''),
        [answer, setAnswer] = useState<string>('')



    const addNewCardHandler = () => {
        dispatch(addCardTC(cardsPackId, question, answer))
        closeModal()
        setQuestion('')
        setAnswer('')
    }

    const onChangeNavigateHandler = () => {
        if (status === 'idle') {
            navigate(-1);
        }
    }

    const onChangeTextAddHandlerFirst = (value: string) => setQuestion(value)

    const onChangeTextAddHandlerSecond = (value: string) => setAnswer(value)

    const closeModal = () => setActiveModal(false)


    return (
        <div>
            <div>
                <span className={st.Addcardbtn}>
                        <IconButton disabled={status === 'loading'} onClick={onChangeNavigateHandler}>
                             <ArrowBackIcon fontSize='large'/>
                        </IconButton>
                <h2>{packName}</h2>
                     <Button size='large'
                                color='success'
                                variant="contained"
                                onClick={() => setActiveModal(true)}
                                disabled={myId !== packUserId || status === 'loading'}
                        >Add card</Button>
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
            <CardsTable/>
        </div>
    )
};