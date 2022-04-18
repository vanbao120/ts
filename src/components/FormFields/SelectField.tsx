import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import { Control, useController } from 'react-hook-form'

interface RadioOption {
    label?: string
    value?: string | number
}
interface Props {
    name: string
    control: Control<any>
    label?: string
    disabled?: boolean
    options: RadioOption[]
}

export function SelectField({ name, control, label, disabled, options }: Props) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
    })
    return (
        <FormControl disabled={disabled} margin="normal" error={invalid}>
            <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
            >
                {options.map(option =>(
                <FormControlLabel value={option.value} control={<Radio />} label={option.label} key={option.value}/>
                ))}
            </RadioGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}