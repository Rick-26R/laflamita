import * as React from 'react';
import { useState } from 'react';
import { Button, TextField, Grid, Box, Container, Snackbar, Alert } from '@mui/material';
import Title from '../Title';
import axios from 'axios';
import { getToken } from '../../../utils/CookiesUtils';
import Router from 'next/router';

export default function UsersFormUpdate(props) {
    console.log(props);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('name');
        const surname = data.get('surname');
        const email = data.get('email');
        const password = data.get('password');

        if (!name || !surname || !email || !password) {
            setSnackbarMessage('Por favor, complete todos los campos.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setSnackbarMessage('Por favor, ingrese un correo válido.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.put('/api/users/update/' + props.data.id, {
                name: name,
                lastname: surname,
                email: email,
                password: password,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });


            if (response.status === 200) {
                setSnackbarMessage('Usuario actualizado con éxito.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                Router.reload();
            }

        } catch (error) {
            console.error(error);
            setSnackbarMessage('Error al actualizar el usuario.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Title>Editar usuario</Title>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                defaultValue={props.data.name.split(' ')[0]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="surname"
                                required
                                fullWidth
                                id="surname"
                                label="Apellido(s)"
                                defaultValue={props.data.name.split(' ')[1]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="email"
                                required
                                fullWidth
                                id="email"
                                label="Correo"
                                type="email"
                                defaultValue={props.data.mail}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Contraseña"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
