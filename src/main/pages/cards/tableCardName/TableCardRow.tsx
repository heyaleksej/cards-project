import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import {shorter} from "../../../utils/shorter";
import {Rating} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Grade";
import FavoriteBorderIcon from "@mui/icons-material/Grade";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {ModalConfirmDelete} from "../../../common/Modal/ModalConfirmDelete";
import CreateIcon from "@mui/icons-material/Create";
import {ModalCard} from "../../../common/Modal/ModalCard";
import React, {useState} from "react";
import {CardType} from "../../../../api/cards&packsAPI/CardsAPI";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {deleteCardTC, updateCardTC} from "../cardsReducer";


export const TableCardRow = ({question, answer, updated, grade, _id}: CardType) => {


    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [updateQuestion, setUpdateQuestion] = useState<string>(question)
    const [updateAnswer, setUpdateAnswer] = useState<string>(answer)


    const myId = useAppSelector(state => state.profile.myId)
    const userId = useAppSelector(state => state.cardPack.packUserId)
    const status = useAppSelector(state => state.app.status)
    const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id)

    const dispatch = useAppDispatch();

    const disabled = myId !== userId || status === 'loading'


    const confirmRemoveCard = (cardsId: string) => {
        dispatch(deleteCardTC(cardsPack_id, cardsId))
        closeDeleteModalForm()
    }

    const closeDeleteModalForm = () => setActiveModalDelete(false)
    const closeUpdateModalForm = () => setActiveModalUpdate(false)

    const onChangeQuestionUpdateHandler = (value: string) => setUpdateQuestion(value)
    const onChangeAnswerUpdateHandler = (value: string) => setUpdateAnswer(value)


    const updateCard = (cardId: string, question: string, answer: string) => {
        console.log("cardId", cardId)
        dispatch(updateCardTC(cardsPack_id, cardId, question, answer))
        closeUpdateModalForm()
    }


    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                                        <span style={{display: 'inline-block', flex: '1 1 auto'}}>
                                             {shorter(question, 50)}
                                        </span>
                </TableCell>
                <TableCell align="justify">{shorter(answer, 100)}</TableCell>
                <TableCell align="justify">
                    {new Date(updated).toLocaleDateString()}
                </TableCell>
                <TableCell align="justify">
                    <Rating
                        value={Number(grade.toFixed(1))}
                        precision={0.1}
                        icon={<FavoriteIcon fontSize="inherit" color="error"/>}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                        size="medium"
                        disabled={status === 'loading'}
                        readOnly
                    />
                </TableCell>
                <TableCell align="center">
                    <TableRow>
                        <IconButton onClick={() => setActiveModalDelete(true)}
                                    disabled={disabled}
                                    aria-label="delete"
                        >
                            <DeleteForeverIcon/>
                        </IconButton>

                        {activeModalDelete &&
                        <ModalConfirmDelete
                            confirmHandler={confirmRemoveCard}
                            closeModal={closeDeleteModalForm}
                            title='Are you sure you want to delete this card?'
                            cardId={_id}
                        />}
                        <IconButton
                            onClick={() => setActiveModalUpdate(true)}
                            disabled={disabled}
                            aria-label="delete"
                        >
                            <CreateIcon/>
                        </IconButton>

                        {activeModalUpdate && <ModalCard
                            onChangeQuestion={onChangeQuestionUpdateHandler}
                            onChangeAnswer={onChangeAnswerUpdateHandler}
                            closeModal={closeUpdateModalForm}
                            question={updateQuestion}
                            answer={updateAnswer}
                            addTextHandler={updateCard}
                            cardId={_id}
                            title='You can update this card'/>}
                    </TableRow>
                </TableCell>
            </TableRow>
        </>

    )
}