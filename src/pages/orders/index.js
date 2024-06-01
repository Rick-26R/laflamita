import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Head from 'next/head';
import MenuDash from '@/modules/MenuDash';
import ContentAdmin from '@/modules/ContentAdmin';
import ContentUser from '@/modules/ContentUser';

export default function Orders() {
    const [user, setUser] = React.useState('admin');

    return (
        <>
            <Head>
                <title>Ordenes</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <MenuDash title="Ordenes"/>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    {/* Contenido */}
                    <Toolbar />
                </Box>
            </Box>
        </>
    );
}