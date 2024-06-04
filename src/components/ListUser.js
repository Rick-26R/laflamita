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

export const mainListItems = (
    <React.Fragment>
        <ListItemButton
            href='/dashboard'
        >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
            href='/inventory'
        >
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventario" />
        </ListItemButton>


        <ListItemButton
            href='/orders'
        >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
        </ListItemButton>

        <ListItemButton
            href='/clients'
        >
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton
            href='/users'
        >
            <ListItemIcon>
                <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
        </ListItemButton>

        <ListItemButton
            href='/requests'
        >
            <ListItemIcon>
                <RequestPageIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
        </ListItemButton>

        <ListItemButton
            href='/providers'
        >
            <ListItemIcon>
                <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" />
        </ListItemButton>

    </React.Fragment>
);