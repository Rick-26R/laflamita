import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Head from 'next/head';
import MenuDash from '@/modules/MenuDash';

export default function IndexProviders() {
    const [user, setUser] = React.useState('admin');

    return (
        <>
            <Head>
                <title>Provedores</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <MenuDash title="Provedores"/>
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