import React, {FC, KeyboardEvent} from 'react'
import {Button, Stack} from "@mui/material"
import s from './Modal.module.css'
import CloseIcon from "@mui/icons-material/Close";


type PropsType = {
    confirmHandler: (id: string) => void
    closeModal: () => void
    title: string
    packID?: string
    cardId?:string

}

export const ModalConfirmDelete: FC<PropsType> = ({confirmHandler, closeModal, title,packID, cardId}) => {


    const successHandler = () => {
        if (packID) {
            confirmHandler(packID)
        } else if (cardId) {
            confirmHandler(cardId)
        }
    }


    return (
            <div className={s.wrapper} onClick={closeModal}>
                <div className={s.modal}  onClick={e => {e.stopPropagation()}}>
                    <div className={s.closeBtnWrapper}>
                        <Button className={s.buttonClose} onClick={closeModal} size="medium"><CloseIcon fontSize="large"/></Button>
                    </div>
                    <div className={s.title}>{title}</div>
                    <Stack  direction="row" spacing={2}>
                        <Button variant="contained" color="error" onClick={successHandler}>Delete</Button>
                        <Button variant="contained" color="success" onClick={closeModal}>Cancel</Button>
                    </Stack>
                </div>
            </div>
    )
}

