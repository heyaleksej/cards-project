import React, {ChangeEvent, FC} from 'react'
import {useParams} from 'react-router-dom';
import {Button, Input} from "@mui/material";
import s from './Modal.module.css'
import CloseIcon from '@mui/icons-material/Close';
type PropsType = {
    closeModal: () => void
    input: string
    onChangeText: (value: string) => void
    addTextHandler?: (id: string, value: string) => void
    addNewItemHandler?: (value: string) => void
    title: string
    isAddingForm: boolean
    packId: string
}

export const ModalChangeData: FC<PropsType> = ({
                                             packId,
                                             closeModal,
                                             input,
                                             onChangeText,
                                             addTextHandler,
                                             title,
                                             addNewItemHandler,
                                             isAddingForm
                                         }) => {
    const paramsCard = useParams<{ cardId: string }>()

    const onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeText(event.currentTarget.value)
    }
    const successHandler = () => {
        if (packId) {
            addTextHandler && addTextHandler(packId, input)
        } else if (paramsCard.cardId) {
            addTextHandler && addTextHandler(paramsCard.cardId, input)
        }
    }

    const successAddHandler = () => {
        addNewItemHandler && addNewItemHandler(input)
    }

    return (
        <div className={`${s.wrapper} ${s.animation}`}>
            <div className={s.modal}>
                <div className={s.closeBtnWrapper}>
                    <Button className={s.buttonClose} onClick={closeModal} size="large"><CloseIcon fontSize="large"/></Button>
                </div>
                <div className={s.title}>{title}</div>
                <div>
                    <Input  className={s.input} onChange={onChangeCallback} value={input}/>
                    <Button onClick={isAddingForm ? successAddHandler : successHandler} disabled={!input}
                    >Ok</Button>
                </div>
            </div>
        </div>
    )
}