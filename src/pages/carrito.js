import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { CssBaseline } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const products = [
  { id: 1, name: 'Manzana', price: 20.50, imageUrl: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00000000004016L1.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', description: 'Una deliciosa manzana fresca.' },
  { id: 2, name: 'Platano', price: 18.46, imageUrl: 'https://www.smartnfinal.com.mx/wp-content/uploads/2016/08/99555-PLATANO-PORTALIMON.jpg', description: 'Un nutritivo plátano maduro.' },
];

export default function Home() {
  const [cartItems, setCartItems] = useState(products);
  const [quantities, setQuantities] = useState(products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {}));

  const handleQuantityChange = (id, delta) => {
    const newQuantity = quantities[id] + delta;
    if (newQuantity >= 1) {
      setQuantities({ ...quantities, [id]: newQuantity });
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
    const newQuantities = { ...quantities };
    delete newQuantities[product.id];
    setQuantities(newQuantities);
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * quantities[item.id], 0);
  const borrar = () => {
    setCartItems([]);
    setQuantities({});
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrito
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((product) => (
              <Card key={product.id} style={{ marginBottom: '16px' }}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={product.imageUrl}
                      alt={product.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Box mt={2} display="flex" alignItems="center">
                        <Typography variant="body2" marginRight={1}>Cantidad:</Typography>
                        <Box border={1} borderRadius={4} borderColor="primary.main" p={1} display="flex" alignItems="center">
                          <IconButton onClick={() => handleQuantityChange(product.id, -1)}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body2" style={{ margin: '0 8px' }}>{quantities[product.id]}</Typography>
                          <IconButton onClick={() => handleQuantityChange(product.id, 1)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Box ml={2}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeFromCart(product)}
                          >
                            Eliminar
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box  bgcolor="grey.900" borderRadius="8px" padding="16px">
              <Typography variant="h6">Subtotal ({cartItems.length} productos):</Typography>
              <Typography variant="h5">${subtotal.toFixed(2)}</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button variant="contained" color="primary" fullWidth onClick={borrar}>
                  Vaciar carrito
                </Button>
                <Button variant="contained" color="primary" fullWidth href='/Success'>
                  Confirmar compra
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
