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
import Router from 'next/router';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton
            onClick={() => {
                Router.push('/dashboard')
            }}
        >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
            onClick={() => {
                Router.push('/orders')
            }}
        >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
        </ListItemButton>

        <ListItemButton
            onClick={() => {
                Router.push('/customers')
            }}
        >
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton
            onClick={() => {
                Router.push('/users')
            }}
        >
            <ListItemIcon>
                <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
        </ListItemButton>

        <ListItemButton
            onClick={() => {
                Router.push('/requests')
            }}
        >
            <ListItemIcon>
                <RequestPageIcon />
            </ListItemIcon>
            <ListItemText primary="Solicitudes" />
        </ListItemButton>

        <ListItemButton
            onClick={() => {
                Router.push('/providers')
            }}
        >
            <ListItemIcon>
                <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" />
        </ListItemButton>

    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListItemButton
            onClick={() => {
                Router.push('/config')
            }}
        >
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
        </ListItemButton>

    </React.Fragment>
);