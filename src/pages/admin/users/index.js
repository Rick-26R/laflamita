import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Head from 'next/head';
import MenuDash from '@/modules/MenuDash';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '@/components/Copyright';
import Users from '@/modules/Users';
import { getRole } from '../../../../utils/CookiesUtils';
import Router from 'next/router';

export default function IndexUsers() {

    React.useEffect(() => {
        if (getRole() !== 'superadmin') {
            Router.push('/admin/dashboard');
        }
    }, []);

    return (
        <>
            <Head>
                <title>Usuarios</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <MenuDash title="Usuarios" />
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
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Users />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </>
    );
}