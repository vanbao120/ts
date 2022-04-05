import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function Header(props: {onLogOut: () => void}) {
    const { onLogOut } = props
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Student Management
                    </Typography>
                    <Button color="inherit" onClick={onLogOut}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
