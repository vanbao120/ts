import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export function SideBar() {
    const NavLinkAdmin = styled(NavLink)(({theme}) => ({
        color: 'inherit',
        textDecoration: 'none',
        '&.active li': {
            backgroundColor: '#FFFFA9',
            color: '#ff9240'
        }
    }))
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLinkAdmin to="/admin/dashboard">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                    </NavLinkAdmin>
                    <NavLinkAdmin to="/admin/students">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Students" />
                            </ListItemButton>
                        </ListItem>
                    </NavLinkAdmin>
                </List>
            </nav>
            <Divider />
        </Box>
    );
}
