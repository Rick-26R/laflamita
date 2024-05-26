// pages/mision.js
import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

export default function Mision() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            alt="Abarrotera de Temixco"
            height="250"
            image="../image/mision.png"
            title="Abarrotera de Temixco"
          />
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>
              Nuestra Misión
            </Typography>
            <Typography variant="body1" paragraph>
              En la Abarrotera de Temixco, nuestra misión es ofrecer productos de alta calidad y variedad a precios accesibles para satisfacer las necesidades de nuestros clientes, contribuyendo al bienestar de la comunidad.
            </Typography>
            <Typography variant="body1" paragraph>
              Nos esforzamos por brindar un servicio excepcional, fomentando la confianza y la lealtad de nuestros clientes a través de un enfoque en la excelencia y la responsabilidad social.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
