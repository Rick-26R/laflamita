import React from 'react'
import { Button, Container, Grid, InputLabel, TextField, Box } from '@mui/material'
import Title from '../Title';
import axios from 'axios';
import Router from 'next/router';
import { getToken } from '../../../utils/CookiesUtils';

export default function CategoryForm() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
        });

        try {
            const response = await axios.post('/api/category', { name: data.get('name') }, { headers: { 'Authorization': `Bearer ${getToken()}` } });
            console.log(response);
            if (response.data.status === 201) {
                Router.reload();
            }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <>

            <Container component="main" maxWidth="md">
                <Title>Agregar categoría</Title>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <InputLabel id="name-label">Nombre</InputLabel>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
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
            </Container>
        </>
    )
}
export function CategoryFormPut(props) {
    console.log(props.data);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const response = await axios.put(`/api/category/${props.data.id}`, { name: data.get('name') }, { headers: { 'Authorization': `Bearer ${getToken()}` } });
            console.log(response);
            if (response.data.status === 200) {
                Router.reload();
            }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <>

            <Container component="main" maxWidth="md">
                <Title>Actualizar categoría</Title>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <InputLabel id="name-label">Nombre</InputLabel>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    defaultValue={props.data.category}
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
            </Container>
        </>
    )
}
