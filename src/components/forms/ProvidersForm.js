import * as React from 'react';
import { useState } from 'react';
import { Button, TextField, Grid, Box, Container, Snackbar, Alert } from '@mui/material';
import Title from '../Title';

export default function ProvidersForm() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('name');
        const surname = data.get('surname');
        const email = data.get('email');

        if (!name || !surname || !email) {
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

        setSnackbarMessage('Formulario enviado exitosamente.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

    };

    return (
        <Container component="main" maxWidth="md">
            <Title>Agregar proveedor</Title>
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="surname"
                                required
                                fullWidth
                                id="surname"
                                label="Apellido(s)"
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
export function ProvidersFormPut(props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = data.get('name');
        const lastname = data.get('lastname');
        const email = data.get('email');

        if (!name || !lastname || !email) {
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

        setSnackbarMessage('Formulario enviado exitosamente.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

    };

    return (
        <Container component="main" maxWidth="md">
            <Title>Actualizar proveedor</Title>
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
                                defaultValue={props.data.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastname"
                                required
                                fullWidth
                                id="lastname"
                                label="Apellido(s)"
                                defaultValue={props.data.lastname}
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
                                defaultValue={props.data.email}
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
