import React, {ChangeEvent, useEffect, useState} from 'react';
import {setCardsPage, setCardsPageCount, setSearchQuestion, setSortCards} from '../cardsReducer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell/TableCell';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {TableCardRow} from './TableCardRow';
import {PaginationComponent} from "../../packs/Pagination/PaginationComponent";
import {Search} from "../../../common/Search/Search";
import useDebounce from "../../../utils/useDebounce";

export const CardsTable = () => {

    const cards = useAppSelector(state => state.cardPack.cards)
    const status = useAppSelector(state => state.app.status)
    const pageCount = useAppSelector(state => state.cardPack.pageCount)
    const page = useAppSelector(state => state.cardPack.page)
    const totalCardsCount = useAppSelector(state => state.cardPack.cardsTotalCount)

    const [value, setValue] = useState('')

    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        dispatch(setSearchQuestion(debouncedValue));
        dispatch(setCardsPage(1));
    }, [debouncedValue])

    const [updated, setUpdated] = useState<'0updated' | '1updated'>('1updated');
    const dispatch = useAppDispatch();

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    const onChangePageHandler = (page: number) => dispatch(setCardsPage(page));

    const onChangePageCountHandler = (value: number) => {
        dispatch(setCardsPageCount(value));
        dispatch(setCardsPage(1));
    }

    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        updated && dispatch(setSortCards(updated));
    }

    return (
        <Paper elevation={3} style={{background: 'rgba(255, 255, 255, 0.7)'}}>
            <div>
                <Search value={value} callback={changeValueHandler}/>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="justify">
                                <b>Question</b>
                            </TableCell>
                            <TableCell align="justify">
                                <b>Answer</b>
                            </TableCell>
                            <TableCell align="justify">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={updated === '1updated' ? 'asc' : 'desc'}
                                    onClick={handleSortUpdated}>
                                </TableSortLabel>
                                <b>Updated</b>
                            </TableCell>
                            <TableCell align="justify">
                                <b>Grade</b>
                            </TableCell>
                            <TableCell align="justify">
                                <b>Actions</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.length
                            ? cards.map(({answer, question, updated, _id, grade}) => (<TableCardRow
                                key={_id}
                                answer={answer}
                                question={question}
                                updated={updated}
                                _id={_id}
                                grade={grade}
                            />))
                            : (
                                <TableRow>
                                    <TableCell>Loading...</TableCell>
                                </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationComponent
                page={page}
                pageCount={pageCount}
                totalCardsCount={totalCardsCount}
                onChangePage={onChangePageHandler}
                onChangeValue={onChangePageCountHandler}
                disable={status === 'loading'}
                title="Cards per Page"
            />
        </Paper>
    )
};

