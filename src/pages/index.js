import React, { useState } from 'react';
import { Button, Box, Container, TextField, IconButton, Typography, InputAdornment, Snackbar, Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setSnackbarMessage('Por favor, complete todos los campos.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setSnackbarMessage('Por favor, ingrese un correo válido.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const response = await axios.post('/api/login', { email, password });

    if (response.status !== 200) {
      setSnackbarMessage('Error al iniciar sesión.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const cookieData = {
      token: response.data.data.token,
      role: response.data.data.role,
      path: response.data.data.path,
    };

    Cookies.set('token', JSON.stringify(cookieData), { expires: 1 });
    
    
    setSnackbarMessage('Inicio de sesión exitoso.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    // Aquí iría la lógica para redirigir al usuario después de un inicio de sesión exitoso

    //Esperar 2 segundos antes de redirigir
    setTimeout(() => {
      Router.push(response.data.data.path);
    }, 2000);

  };

  return (
    <>
      <title>Iniciar Sesión</title>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <form onSubmit={handleLogin}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                maxWidth: '400px',
                width: '100%',
              }}
            >
              <Typography variant="h1" fontSize={30} style={{ marginBottom: '20px' }}>
                Iniciar Sesión
              </Typography>

              <TextField
                id="correo-basic"
                label="Correo"
                variant="outlined"
                style={{
                  margin: '10px 0',
                  width: '100%',
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password-basic"
                label="Contraseña"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                style={{
                  margin: '10px 0 30px',
                  width: '100%',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" color="success" size="large" variant="outlined" fullWidth style={{ maxWidth: '400px' }}>
                Iniciar Sesión
              </Button>

              <Typography variant="body1" fontSize={18} style={{ marginTop: '30px' }}>
                ¿No tienes cuenta? <Link href="/signup" style={{ textDecoration: 'none', color: '#388e3c' }}>Regístrate</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>

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
