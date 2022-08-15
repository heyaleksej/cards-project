import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './CardSlider.module.css';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {setMaxNumberCards, setMinNumberCards} from "../../pages/packs/PacksTable/packsTableReducer";
import {Stack} from '@mui/material';


export const CardSlider = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const min = useAppSelector(state => state.tablePacks.min)
    const max = useAppSelector(state => state.tablePacks.max)

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const handleClick = () => {
        dispatch(setMinNumberCards(value[0]))
        dispatch(setMaxNumberCards(value[1]))
    }

    return (
        <div className={styles.slider}>

            <div style={{textAlign: "center"}}>Number of cards</div>
            <span>
                <Stack direction='row' spacing={2}>
                <span>{value[0]}</span>
                    <Slider
                        sx={{  color: '#52af77',
                            height: 8,
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                height: 24,
                                width: 24,
                                backgroundColor: '#fff',
                                border: '2px solid currentColor',
                                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                                    boxShadow: 'inherit',
                                },
                                '&:before': {
                                    display: 'none',
                                },
                            },
                            '& .MuiSlider-valueLabel': {
                                lineHeight: 1.2,
                                fontSize: 12,
                                background: 'unset',
                                padding: 0,
                                width: 32,
                                height: 32,
                                borderRadius: '50% 50% 50% 0',
                                backgroundColor: '#52af77',
                                transformOrigin: 'bottom left',
                                transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                                '&:before': { display: 'none' },
                                '&.MuiSlider-valueLabelOpen': {
                                    transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                                },
                                '& > *': {
                                    transform: 'rotate(45deg)',
                                },
                            }}}
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        max={110}
                        disabled={status === 'loading'}
                        onChangeCommitted={handleClick}
                    />
                <span>{value[1]}</span>
                </Stack>
            </span>

        </div>
    )
}