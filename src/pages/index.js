import React, { useState } from 'react';
import { Button, Box, Container, TextField, IconButton, Typography, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
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
          <form>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                padding: '20px',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h1" fontSize={30}>
                Iniciar Sesión
              </Typography>

              <TextField
                id="correo-basic"
                label="Correo"
                variant="outlined"
                style={{
                  margin: '20px',
                  width: '90%',
                }}
              />
              <TextField
                id="Password-basic"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                style={{
                  marginBottom: '30px',
                  width: '90%',
                }}
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

              <Button color="success" size="large" variant="outlined" fullWidth>
                Iniciar Sesión
              </Button>

              <Typography variant="body1" fontSize={18} style={{ marginTop: '10px' }}>
                ¿No tienes cuenta? <Link href="/signup" style={{ textDecoration: 'none', color: '#388e3c' }}>Regístrate</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
