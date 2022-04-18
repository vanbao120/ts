import { TextField } from '@mui/material'
import React, { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    control: Control<any>
    label?: string
}

export function InputField({ name, control, label, ...rest }: Props) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
    })
    return (
        <TextField fullWidth
            size='small'
            margin="normal"
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={rest}
        />
    )
}