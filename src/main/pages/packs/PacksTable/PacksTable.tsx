import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './PacksTable.module.css';
import {useAppDispatch} from "../../../../app/hooks";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from "@mui/material/TableCell";
import {TableRowItem} from "./TableRowItem/TableRowItem";
import {setCardsPageCount, setPage, setSearchPackName, setSortPackName} from "./packsTableReducer";
import {PaginationComponent} from "../Pagination/PaginationComponent";
import {Search} from '../../../common/Search/Search';
import {SortSelect} from '../../../common/SortSelect/SortSelect';
import useDebounce from "../../../utils/useDebounce";
import {RequestStatusType} from "../../../../app/app-reducer";
import {PackType} from "../../../../api/cards&packsAPI/PacksAPI";

type PacksTablePropsType = {
    myId: string | null
    status: RequestStatusType
    cardPacks: PackType[]
    totalCardsCount: number
    page: number
    pageCount: number
    updatePack: (packId: string, value: string) => void
    SendPackId: (_id: string, name: string) => void
    deletePack: (packId: string) => void

}

const PacksTable = ({
                        myId,
                        status,
                        cardPacks,
                        totalCardsCount,
                        page,
                        pageCount,
                        updatePack,
                        SendPackId,
                        deletePack
                    }: PacksTablePropsType) => {


    const [value, setValue] = useState('');
    const [cardsCount, setCardsCount] = useState<'0cardsCount' | '1cardsCount'>('0cardsCount');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('1updated');

    const debouncedValue = useDebounce<string>(value, 1000);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSearchPackName(debouncedValue));
        dispatch(setPage(1));
    }, [debouncedValue])

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    //pagination
    const handleChangePage = (page: number) => dispatch(setPage(page))
    const handleChangeValueSelect = (value: number) => dispatch(setCardsPageCount(value))
    const handleCardsCount = () => {
        setCardsCount(cardsCount === '0cardsCount' ? '1cardsCount' : '0cardsCount');
        cardsCount && dispatch(setSortPackName(cardsCount));
    }
    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        updated && dispatch(setSortPackName(updated));
    }



    return (
        <Paper elevation={3} style={{background: 'rgba(255, 255, 255, 0.7)'}}>
            <span className={styles.searchWrap}>
                <div className={styles.search}>
                    <Search value={value} callback={handleChangeValue}/>
                </div>
                <SortSelect handleSortUpdated={handleSortUpdated} handleCardsCount={handleCardsCount}/>
            </span>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{display: 'grid', gridTemplateColumns: '21% 15% 19% 17% 28%'}}>
                            <TableCell>
                                <b>Name</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Cards</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Last Updated</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Created by</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Actions</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.length
                            ? cardPacks.map(({
                                                 _id,
                                                 name,
                                                 cardsCount,
                                                 updated,
                                                 user_name,
                                                 user_id
                                             }) => (<TableRowItem
                                    key={_id}
                                    _id={_id}
                                    name={name}
                                    cardsCount={cardsCount}
                                    updated={updated}
                                    user_name={user_name}
                                    user_id={user_id}
                                    status={status}
                                    myId={myId}
                                    updatePack={updatePack}
                                    deletePack={deletePack}
                                    SendPackId={SendPackId}

                                />
                            ))
                            : (
                                <TableRow>
                                    <TableCell>Loading packs...</TableCell>
                                </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationComponent
                totalCardsCount={totalCardsCount}
                pageCount={pageCount}
                page={page}
                title="Cards per Page"
                disable={status === 'loading'}
                onChangePage={handleChangePage}
                onChangeValue={handleChangeValueSelect}
            />
        </Paper>
    )
};

export default PacksTable;