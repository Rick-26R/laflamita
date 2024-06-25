import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { CssBaseline } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MenuDash from '@/modules/MenuDash';
import Toolbar from '@mui/material/Toolbar';
import { decodeToken } from '../../../utils/TokenUtils';
import { getToken } from '../../../utils/CookiesUtils';
import Cookies from 'js-cookie';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  useEffect(() => {
    // Cargar el carrito de localStorage al inicio
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": []}');
    setCartItems(cart.items);
  }, []);

  const handleQuantityChange = (id, delta) => {
    // Actualizar la cantidad del producto correspondiente
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);
    // Actualizar localStorage con los items actualizados
    localStorage.setItem('cart', JSON.stringify({ items: updatedCartItems }));
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
    // Actualizar localStorage con los items actualizados
    localStorage.setItem('cart', JSON.stringify({ items: updatedCartItems }));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const borrar = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <>
      <title>Carrito</title>
      <Box sx={{ display: 'flex' }}>
        <MenuDash title="Carrito" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
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
                          image={product.image}
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
                              <Typography variant="body2" style={{ margin: '0 8px' }}>{product.quantity}</Typography>
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
                <Box bgcolor="grey.900" borderRadius="8px" padding="16px">
                  <Typography variant="h6">Subtotal ({cartItems.length} productos):</Typography>
                  <Typography variant="h5">${subtotal.toFixed(2)}</Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={borrar}>
                      Vaciar carrito
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={async () => {
                        // Aquí puedes enviar la orden al servidor
                        console.log('Orden enviada:', { cartItems });
                        console.log(Cookies.get('email'));

                        const data = {
                          name: Cookies.get('email'),
                          total: subtotal,
                          items: cartItems,
                          isPaid: false,
                        };

                        try {
                          const response = await axios.post('/api/orders', { ...data }, {
                            headers: {
                              Authorization: `Bearer ${getToken()}`,
                            },
                          });

                          console.log('Respuesta del servidor:', response);

                          if (response.status === 201) {
                            setSnackbarMessage('Compra realizada con éxito.');
                            setSnackbarSeverity('success');
                            setSnackbarOpen(true);
                          }

                          borrar();

                        } catch (error) {
                          console.error('Error al enviar la orden:', error);
                          setSnackbarMessage('Error al enviar la orden.');
                          setSnackbarSeverity('error');
                          setSnackbarOpen(true);
                        }
                      }}
                    >
                      Confirmar compra
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
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
    </>
  );
}
