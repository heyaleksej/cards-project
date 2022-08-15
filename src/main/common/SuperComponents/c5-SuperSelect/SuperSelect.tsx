import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './SuperSelect.module.css'


type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] | undefined = options?.map((option, index) => {
        return <option className={s.option} key={option + '-' + index} value={option}>{option}</option>
    });

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)

        onChangeOption
        && onChangeOption(e.currentTarget.value)
    }

    const finalSelectClass = s.select

    return (
        <select onChange={onChangeCallback} {...restProps} className={finalSelectClass}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
