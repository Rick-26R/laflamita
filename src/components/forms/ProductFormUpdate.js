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

export default function ProductFormUpdate(props) {
    console.log(props.data);
    const [categories, setCategories] = React.useState([]);
    const [providers, setProviders] = React.useState([]);
    const [formData, setFormData] = React.useState(props.data);

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
                    value: category._id,
                    label: category.name
                }));
                setCategories(categoriesData);

                const providersData = providersResponse.data.data.map(provider => ({
                    value: provider._id,
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
        const updatedData = {
            name: data.get('name'),
            cost: data.get('cost'),
            costPublic: data.get('costpublic'),
            quantity: data.get('quantity'),
            category: data.get('category'),
            expirationDate: data.get('expirationDate'),
            image: data.get('image') === 'data:application/octet-stream;base64,' ? '' : data.get('image'),
        };

        console.log(updatedData);

        if (updatedData.cost <= 0 || updatedData.costPublic <= 0 || updatedData.quantity <= 0) {
            setSnackbarMessage('Por favor, ingrese valores válidos.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (updatedData.expirationDate < new Date().toISOString().split('T')[0]) {
            setSnackbarMessage('Por favor, ingrese una fecha válida.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (updatedData.image instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(updatedData.image);
            updatedData.image = await new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        }

        try {
            const response = await axios.put(`/api/inventory/${props.data.id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            if (response.status === 200) {
                setSnackbarMessage('Producto actualizado exitosamente.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => {
                    Router.reload();
                }, 2000);
            }
        } catch (error) {
            console.error("Error updating product", error);
            setSnackbarMessage('Error al actualizar el producto.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleNumericInput = (event) => {
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (!regex.test(event.target.value)) {
            event.preventDefault();
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    console.log(formData);

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="name-label">Nombre</InputLabel>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
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
                                value={formData.cost}
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
                                value={formData.costPublic}
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
                                value={formData.quantity}
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
                                value={formData.category}
                                onChange={handleChange}
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
                                value={formData.expirationDate}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <InputLabel id="provider-label">Proveedor</InputLabel>
                            <Select
                                fullWidth
                                id="provider"
                                name="provider"
                                value={formData.provider}
                                onChange={handleChange}
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
                                    onChange={(e) => setFormData(prevData => ({ ...prevData, image: e.target.files[0] }))}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
