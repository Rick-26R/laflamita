import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import Title from './Title';

export default function ProductOrder() {
    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Card>
                <CardContent>
                    <Title>
                        Compra Exitosa
                    </Title>
                    {products.map((product, index) => (
                        <Card key={index} variant="outlined" style={{ display: 'flex', marginTop: '1rem' }}>
                            <CardMedia
                                component="img"
                                style={{ width: 150 }}
                                image={product.imageUrl}
                                alt={product.name}
                            />
                            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                    <Box textAlign="center">
                        <Button variant="contained" color="primary" href='/products'>
                            Confirmar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export function ProductOrderModal(props) {
    console.log(props);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setProducts(props.data);

        let total = 0;
        props.data.forEach(product => {
            total += product.price * product.quantity;
        });

        setTotal(total);

    }, [props.data]);



    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Card>
                <CardContent>
                    <Title>
                        Compra Exitosa
                    </Title>
                    {products.map((product, index) => (
                        <>
                            <Card key={index} variant="outlined" style={{ display: 'flex', marginTop: '1rem' }}>
                                <CardMedia
                                    component="img"
                                    style={{ width: 150 }}
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ${product.price}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Cantidad: {product.quantity}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                            <Box>
                                <Title>Total: ${total}</Title>
                            </Box>
                        </>

                    ))}
                </CardContent>
            </Card>
        </Container>
    );
};

