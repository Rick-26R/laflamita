import { Container, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from '@/components/ProductCard'; // Mantenemos el import existente
import Title from './Title';
import axios from 'axios';
import React from 'react';
import { getToken } from '../../utils/CookiesUtils';

function createData(id, date, expirate, name, category, cost, costPublic, quantity, image) {
    return { id, date, expirate, name, category, cost, costPublic, quantity, image };
}

const Products = () => {

    const [products, setProducts] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);

    React.useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await axios.get('/api/inventory', {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                const inventory = res.data.data;
                const formattedRows = inventory.map(item => createData(item._id, item.createdAt.split('T')[0], item.expirationDate, item.name, item.category, item.cost, item.costPublic, item.quantity, item.image));
                setProducts(formattedRows);
                console.log('Inventory fetched:', formattedRows);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);


    return (
        <Container sx={{ margin: '0 auto' }}>
            <Typography variant="h3" component="h1" display="flex" alignItems="center" justifyContent="space-between" gutterBottom>
                <Title>Productos del Supermercado</Title>
                <a href="../client/carrito" style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                    <ShoppingCartIcon sx={{ fontSize: 32, color: 'white' }} />
                </a>
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} xl={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;