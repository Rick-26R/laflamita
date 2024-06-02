import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const products = [
  {
    name: 'Manzana',
    price: '$1.00',
    imageUrl: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00000000004016L1.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
  },
  {
    name: 'Plátano',
    price: '$0.50',
    imageUrl: 'https://www.smartnfinal.com.mx/wp-content/uploads/2016/08/99555-PLATANO-PORTALIMON.jpg',
  },
];

const SuccessPage = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(generateRandomCode());
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Compra Exitosa
          </Typography>
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
          <Typography variant="body1" component="p" style={{ marginTop: '2rem' }}>
            Código para la recolección en tienda:
          </Typography>
          <Typography variant="h6" component="div" style={{ marginBottom: '2rem' }}>
            {code}
          </Typography>
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

export default SuccessPage;
