import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

interface Props {
    icon: React.ReactElement
    label: string
    value: number | undefined
}

const StatisticItem = (props: Props) => {
    const { icon, label, value } = props
    const PaperRoot = styled(Paper)(({theme}) => ({
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`
    }))
    return (
        <PaperRoot>
            <Box>{icon}</Box>
            <Box>
                <Typography variant="h5" align="right">{value}</Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </PaperRoot>
    )
}

export default StatisticItem