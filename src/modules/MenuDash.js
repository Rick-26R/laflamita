import React, { use } from 'react'
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Router from 'next/router';
import { mainListItems as mainListUser } from '../components/ListUser';
import { mainListItems as mainListClient } from '@/components/ListClients';
import { getRole, getToken } from '../../utils/CookiesUtils';
import { isAValidRoute, isExpired } from '../../utils/TokenUtils';
import Cookies from 'js-cookie';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
export default function MenuDash(props) {
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleMenuOpen = () => {
        setAnchorEl(!anchorEl);
    }

    React.useEffect(() => {
        if (!isAValidRoute(Router.pathname, getRole())) {
            Router.push('/');
        }
    try {
        if (!getToken()) {
            Router.push('/');
        }
        if (isExpired(getToken())) {
            Cookies.remove('token');
            Router.push('/');
        }
    } catch (error) {
        Cookies.remove('token');
        Router.push('/');
    }

}, [])

return (
    <>
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {props.title}
                </Typography>
                <IconButton onClick={handleMenuOpen}>
                    <Badge>
                        <AccountCircleIcon
                            sx={{
                                fontSize: 35,
                            }}
                        />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={anchorEl}
                    onClose={handleMenuOpen}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    getContentAnchorEl={null}
                    sx={{
                        marginTop: '40px',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            Cookies.remove('token');
                            Router.push('/');
                        }}
                    >
                        Cerrar sesión
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {getRole() === 'admin' || getRole() === 'superadmin' ? mainListUser : mainListClient}
            </List>
        </Drawer>
    </>
)
}
