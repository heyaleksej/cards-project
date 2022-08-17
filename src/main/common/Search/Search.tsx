import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import React, {ChangeEvent} from "react";
import {useAppSelector} from "../../../app/hooks";
import s from './../../header/Header.module.css'

type TableRowPackType = {
    value: string
    callback: (e: ChangeEvent<HTMLInputElement>)=> void
}

export const Search = (props: TableRowPackType) => {
    const {value, callback} = props;

    const status = useAppSelector(state => state.app.status);

  return (
      <TextField
          fullWidth
          className={s.search}
          sx={{backgroundColor: 'rgba(234,255,255,0.68)', m: 1.3,}}
          size="small"
          placeholder="Search"
          disabled={status === 'loading'}
          value={value}
          onChange={callback}
          InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
      />
  )
}