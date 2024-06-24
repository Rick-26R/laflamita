import React, { useState } from 'react';
import { Button, Box, Container, TextField, IconButton, Typography, InputAdornment, Snackbar, Alert, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

export default function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!name || !lastname || !email || !password || !confirmPassword) {
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

    if (password.length < 8) {
      setSnackbarMessage('La contraseña debe tener al menos 8 caracteres.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage('Las contraseñas no coinciden.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('/api/signup', { name, lastname, email, password });

      if (response.status !== 201) {
        setSnackbarMessage('Error al registrarse.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      setSnackbarMessage('Registro exitoso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        Router.push('/');
      }, 2000);
    } catch (error) {
      if (error.response.status === 400) {
        setSnackbarMessage('El correo electrónico ya está en uso.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      } else {
        setSnackbarMessage('Error al registrarse.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }
    }

  };

  return (
    <>
      <head>
        <title>Registro</title>
      </head>
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
          <form onSubmit={handleSignUp}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                maxWidth: '500px',
              }}
            >
              <Typography variant="h1" fontSize={30} style={{ marginBottom: '20px' }}>
                Regístrate
              </Typography>

              <Grid container spacing={2} style={{ width: '103%' }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="name-basic"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastname-basic"
                    label="Apellidos"
                    variant="outlined"
                    fullWidth
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                id="correo-basic"
                label="Correo"
                variant="outlined"
                style={{
                  margin: '20px 0 10px',
                  width: '100%',
                  padding: '0 0 10px 0',
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
                  margin: '10px 0',
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
              <TextField
                id="confirm-password-basic"
                label="Validar contraseña"
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                style={{
                  margin: '10px 0 30px',
                  width: '100%',
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" color="success" size="large" variant="outlined" fullWidth>
                Registrarse
              </Button>

              <Typography variant="body1" fontSize={18} style={{ marginTop: '30px' }}>
                ¿Ya tienes cuenta? <Link href="/" style={{ textDecoration: 'none', color: '#388e3c' }}>Inicia sesión</Link>
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
        sx={{ zIndex: 9999 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
