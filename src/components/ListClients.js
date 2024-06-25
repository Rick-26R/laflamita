import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import { Info } from '@mui/icons-material';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton
            href='/client/mision'
        >
            <ListItemIcon>
                <Info />
            </ListItemIcon>
            <ListItemText primary="Misión y visión" />
        </ListItemButton>

        <ListItemButton
            href='/client'
        >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
        </ListItemButton>

    </React.Fragment>
);