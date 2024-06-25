import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MenuItem, Select, InputLabel, Input } from '@mui/material';
import { getToken } from '../../../utils/CookiesUtils';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Router from 'next/router';

export default function ProductForm() {
    const [categories, setCategories] = React.useState([]);
    const [providers, setProviders] = React.useState([]);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    React.useEffect(() => {
        const fetchCategoriesAndProviders = async () => {
            try {
                const [categoriesResponse, providersResponse] = await Promise.all([
                    axios.get('/api/category', {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }),
                    axios.get('/api/providers', {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    })
                ]);

                const categoriesData = categoriesResponse.data.data.map(category => ({
                    value: category.name,
                    label: category.name
                }));
                setCategories(categoriesData);
                console.log(categoriesData);
                console.log(providersResponse.data.data);
                const providersData = providersResponse.data.data.map(provider => ({
                    value: provider.name,
                    label: `${provider.name} ${provider.lastname}`
                }));
                setProviders(providersData);
            } catch (error) {
                console.error("Error fetching categories and providers", error);
            }
        };

        fetchCategoriesAndProviders();
    }, []);

    const handleSubmit = async (event) => {
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

        if (!data.get('name') || !data.get('cost') || !data.get('costpublic') || !data.get('quantity') || !data.get('category') || !data.get('expirationDate') || !data.get('image')) {
            setSnackbarMessage('Por favor, complete todos los campos.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        if (data.get('cost') <= 0 || data.get('costpublic') <= 0 || data.get('quantity') <= 0) {
            setSnackbarMessage('Por favor, ingrese valores válidos.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (data.get('expirationDate') < new Date().toISOString().split('T')[0]) {
            setSnackbarMessage('Por favor, ingrese una fecha válida.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        // Convertir la imagen a base64
        const reader = new FileReader();
        reader.readAsDataURL(data.get('image'));
        const image = await new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        }
        );

        try {
            const response = await axios.post('/api/inventory', {
                name: data.get('name'),
                cost: data.get('cost'),
                costPublic: data.get('costpublic'),
                quantity: data.get('quantity'),
                category: data.get('category'),
                provider: data.get('provider'),
                expirationDate: data.get('expirationDate'),
                image: image
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            console.log(response);

            if (response.status === 201) {
                setSnackbarMessage('Producto creado exitosamente.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => {
                    Router.push('/admin/inventory');
                }, 2000);
            }

        } catch (error) {
            console.error("Error creating product", error);
            setSnackbarMessage('Error al crear el producto.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
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
                        {/* <Grid item xs={12}>
                            <InputLabel id="provider-label">Proveedor</InputLabel>
                            <Select
                                fullWidth
                                id="provider"
                                name="provider"
                                defaultValue=""
                            >
                                {providers.map((provider) => (
                                    <MenuItem key={provider.value} value={provider.value}>
                                        {provider.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid> */}
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
