import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Head from 'next/head';
import MenuDash from '@/modules/MenuDash';
import Clients from '@/modules/Clients';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '@/components/Copyright';
import ProductForm from '@/components/forms/ProductForm';
import Title from '@/components/Title';

export default function AddProduct() {
    const [user, setUser] = React.useState('admin');

    return (
        <>
            <Head>
                <title>Producto</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <MenuDash title="Producto" />
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
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', margin: 'auto' }}>
                                    <Title>Agregar producto</Title>
                                    <ProductForm />
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