import { Box, Button } from '@mui/material'
import { InputField, RadioGroupField } from 'components/FormFields'
import { Students } from 'models'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    initialValue?: Students
    onSubmit?: (formValue: Students) => void
}

const StudentForm = ({ initialValue, onSubmit }: Props) => {
    const {
        control,
        handleSubmit
    } = useForm<Students>({
        defaultValues: initialValue
    })

    const handleSubmitForm = (formValue: Students) => {
        console.log(formValue);

    }
    return (
        <Box>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="name" control={control} label="Full Name" />
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    {label: "Male", value: "male"},
                    {label: "Female", value: "female"},
                    {label: "Other", value: "other"},
                ]}/>
                <InputField name="age" control={control} label="Age" type="number" />
                <InputField name="mark" control={control} label="Mark" type="number" />
                <InputField name="city" control={control} label="City" />
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                </Box>
            </form>
        </Box>
    )
}

export default StudentForm