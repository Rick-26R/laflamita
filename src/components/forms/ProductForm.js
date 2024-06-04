import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MenuItem, Select, InputLabel, Input } from '@mui/material';

const categories = [
    { value: 10, label: 'Categoría 1' },
    { value: 20, label: 'Categoría 2' },
    { value: 30, label: 'Categoría 3' },
];

const providers = [
    { value: 10, label: 'Proveedor 1' },
    { value: 20, label: 'Proveedor 2' },
    { value: 30, label: 'Proveedor 3' },
];

export default function ProductForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            cost: data.get('cost'),
            costPublic: data.get('costpublic'),
            quantity: data.get('quantity'),
            category: data.get('category'),
            expirationDate: data.get('expirationDate'),
            image: data.get('image'),
        });

        // Convertir la imagen a base64
        const reader = new FileReader();
        reader.readAsDataURL(data.get('image'));
        reader.onload = function () {
            console.log(reader.result);
        };
    };

    // Validación de entrada numérica
    const handleNumericInput = (event) => {
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (!regex.test(event.target.value)) {
            event.preventDefault();
        }
    };

    // Validación y corrección de entrada numérica
    const handleChange = (event) => {
        const { value } = event.target;
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (!regex.test(value)) {
            event.target.value = value.replace(/[^0-9.]/g, '');
        }
    };

    return (
        <Container component="main" maxWidth="md">
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
                            <InputLabel id="name-label">Nombre</InputLabel>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="cost-label">Costo</InputLabel>
                            <TextField
                                name="cost"
                                required
                                fullWidth
                                id="cost"
                                type="text"
                                onInput={handleNumericInput}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="cost-public-label">Costo al público</InputLabel>
                            <TextField
                                name="costpublic"
                                required
                                fullWidth
                                id="costpublic"
                                type="text"
                                onInput={handleNumericInput}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="quantity-label">Cantidad</InputLabel>
                            <TextField
                                name="quantity"
                                required
                                fullWidth
                                id="quantity"
                                type="text"
                                onInput={handleNumericInput}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="category-label">Categoría</InputLabel>
                            <Select
                                fullWidth
                                id="category"
                                name="category"
                                defaultValue=""
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="expiration-date-label">Fecha de vencimiento</InputLabel>
                            <TextField
                                required
                                fullWidth
                                id="expirationDate"
                                name="expirationDate"
                                type="date"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="category-label">Provedor</InputLabel>
                            <Select
                                fullWidth
                                id="category"
                                name="category"
                                defaultValue=""
                            >
                                {providers.map((provider) => (
                                    <MenuItem key={provider.value} value={provider.value}>
                                        {provider.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="image-label">Imagen</InputLabel>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    fullWidth
                                    inputProps={{ accept: 'image/*' }}
                                />
                            </Box>
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
    );
}
