import * as React from 'react';
import {memo} from 'react';
import styles from './PaginationComponent.module.css';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Pagination} from "@mui/material";

type PaginationComponentType = {
    totalCardsCount?: number
    pageCount?: number
    page?: number
    title?: string
    disable?: boolean
    onChangePage: (page: number) => void
    onChangeValue: (value: number) => void
}

export const PaginationComponent = memo((props: PaginationComponentType) => {
    const {totalCardsCount, pageCount, page, title, disable, onChangeValue, onChangePage} = props;

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        onChangePage(value);
    }
    const handleChangePageCount = (e: SelectChangeEvent) => {
        if (pageCount && Number(e.target.value) !== pageCount) {
            onChangeValue(Number(e.target.value));
        }
    }
    const totalPageCount = totalCardsCount && pageCount && Math.ceil(totalCardsCount / pageCount);

    return (
        <div className={styles.group}>
            <Stack spacing={2} sx={{mr: '2rem'}}>
                <Pagination
                    shape="rounded"
                    disabled={disable}
                    count={totalPageCount}
                    page={page}
                    onChange={handleChangePage}
                />
            </Stack>
            <div className={styles.wrapper}>
                <span>Show</span>
                <Select
                    disabled={disable}
                    size="small"
                    value={String(pageCount)}
                    onChange={handleChangePageCount}
                    sx={{minWidth: '65px', m: '0 0.5rem', height: '30px'}}
                >
                    <MenuItem value="5">{'5'}</MenuItem>
                    <MenuItem value="10">{'10'}</MenuItem>
                    <MenuItem value="15">{'15'}</MenuItem>
                </Select>
                <span>{title}</span>
            </div>
        </div>
    )
});