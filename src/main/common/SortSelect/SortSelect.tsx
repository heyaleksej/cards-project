import s from "../../pages/packs/PacksTable/PacksTable.module.css";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";


type SelectPropsType = {
    handleSortUpdated: () => void
    handleCardsCount?: () => void
}

export const SortSelect = React.memo(({handleSortUpdated, handleCardsCount}: SelectPropsType) => {


    const [sort, setSort] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => setSort(event.target.value as string);


    return <>
        <div className={s.sortSelect}>
            <FormControl
                sx={{
                    m: 1.3,
                    minWidth: 120,
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                        color: "seagreen"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "seagreen"
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "seagreen"
                    }
                }} variant="outlined" size="small">
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                    sx={{
                        "&.MuiOutlinedInput-root": {

                            "&:hover fieldset": {
                                borderColor: "seagreen"
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "seagreen"
                            },
                            "&. label": {
                                color: "seagreen"
                            },

                        }
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort by"
                    onChange={handleChange}
                >
                    <MenuItem onClick={handleSortUpdated} value={'Date'}>
                        Date updated
                    </MenuItem>
                    {handleCardsCount && <MenuItem onClick={handleCardsCount} value={'cardsCount'}>
                        Cards count
                    </MenuItem>}
                </Select>
            </FormControl>
        </div>
    </>
})