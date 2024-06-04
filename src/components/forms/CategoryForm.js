import React from 'react'
import { Button, Container, Grid, InputLabel, TextField, Box } from '@mui/material'
import Title from '../Title';

export default function CategoryForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
        });
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
