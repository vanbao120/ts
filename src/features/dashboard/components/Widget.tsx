import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

interface Props {
    title: string
    children: any
}

const Widget = ({title, children}: Props) => {
    const PaperRoot = styled(Paper)(({theme}) => ({
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`
    }))
  return (
    <PaperRoot>
        <Typography variant="button">{title}</Typography>
        <Box mt={2}>
            {children}
        </Box>
    </PaperRoot>
  )
}

export default Widget