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
import { getRole } from '../../utils/CookiesUtils';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton
            href='/admin/dashboard'
        >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
            href='/admin/inventory'
        >
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventario" />
        </ListItemButton>


        <ListItemButton
            href='/admin/orders'
        >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
        </ListItemButton>

        <ListItemButton
            href='/admin/clients'
        >
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItemButton>

        {getRole() === 'superadmin' && (
            <ListItemButton
                href='/admin/users'
            >
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
            </ListItemButton>
        )}


        {/*  <ListItemButton
            href='/admin/requests'
        >
            <ListItemIcon>
                <RequestPageIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
        </ListItemButton>

        <ListItemButton
            href='/admin/providers'
        >
            <ListItemIcon>
                <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" />
        </ListItemButton> */}

    </React.Fragment>
);