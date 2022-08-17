import React, {ChangeEvent, FC, KeyboardEvent} from 'react'
import {Button} from "@material-ui/core";
import {Input} from "@mui/material";
import s from './Modal.module.css'
import CloseIcon from "@mui/icons-material/Close";


type PropsType = {
    closeModal: () => void
    question: string
    answer: string
    onChangeQuestion: (value: string) => void
    onChangeAnswer: (value: string) => void
    addTextHandler: (id: string, value1: string, value2: string) => void
    title: string
    cardId?: string
    packId?: string
}

export const ModalCard: FC<PropsType> = ({
                                             closeModal,
                                             question,
                                             onChangeQuestion,
                                             onChangeAnswer,
                                             addTextHandler,
                                             title,
                                             cardId,
                                             answer,
                                             packId
                                         }) => {

    const onChangeCallbackForQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeQuestion(event.currentTarget.value)
    }

    const onChangeCallbackForAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeAnswer(event.currentTarget.value)
    }

    const successHandler = () => {
        if (cardId) {
            addTextHandler(cardId, question, answer)
        } else if (packId) {
            addTextHandler(packId, question, answer)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    console.log(cardId)


    return (
        <div className={`${s.wrapper} ${s.animation}`} onClick={closeModal} onKeyUp={onKeyPressHandler}>
            <div className={s.modal} onClick={e => {e.stopPropagation()}}>
                <div className={s.closeBtnWrapper}>
                    <Button className={s.buttonClose} onClick={closeModal} size="large">
                        <CloseIcon fontSize="large"/>
                    </Button>
                </div>
                <div className={s.title}>{title}</div>
                <div >
                    <Input className={s.input}  onChange={onChangeCallbackForQuestion}  value={question}
                                    placeholder='question'/>
                    <Input className={s.input}  onChange={onChangeCallbackForAnswer}
                                    value={answer}
                                    placeholder='answer'/>
                    <Button  className={s.buttonAccept} onClick={successHandler}
                                 disabled={!(question && answer)}>Ok
                    </Button>
                </div>
            </div>
        </div>
    )
}

