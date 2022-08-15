import React from 'react'
import SuperRange from '../c7-SuperRange/SuperRange';
import s from './SuperDoubleRange.module.css'

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value: [number, number]
    min: number
    max: number
    step: number
    setValue1: (n: number) => void
    setValue2: (n: number) => void
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        min, max, step,
        ...props
    }
) => {

    const setValueFunc1 = (n: number) => {
        if (value[1] <= n) return
        props.setValue1(n)
    }
    const setValueFunc2 = (n: number) => {
        if (value[0] >= n) return
        props.setValue2(n)
    }

    // --- без типизации переменной атрибут st идёт в ругань :))) при работе с объектом для атрибута style
    // const st: React.CSSProperties = {
    //     position: 'absolute',
    //     width: '100%'
    // }

    return (
        <div className={s.double}>
            <SuperRange step={step} value={value[0]} min={min} max={max}
                        bgColor={'#eee'}
                        onChangeRange={setValueFunc1}
                        styleClassNameRange={s.rangePosition}
                        styleProgressOverlay={{position: 'relative'}}
            />

            {/*<SuperRange value={value && value[1]} min={min} max={max} - если опционально*/}
            <SuperRange step={step} value={value[1]} min={min} max={max}
                        onChangeRange={setValueFunc2}
            />
        </div>
    )
}

export default SuperDoubleRange