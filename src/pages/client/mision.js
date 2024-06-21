import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Mision() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', padding: '50px 0' }}>
      
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Box sx={{ maxWidth: 800, width: '100%' }}>
          <img
            src="/mision.png"
            alt="Abarrotera de Temixco"
            style={{ width: '100%', height: '470px', objectFit: 'contain' }}
          />
        </Box>
      </Box>
      
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Box sx={{ maxWidth: 800, width: '100%', padding: 2, color: '#fff' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Horarios de Atención
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
            Lunes a Viernes: 8:00 AM - 10:00 PM
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
            Sábados: 8:00 AM - 1:00 PM
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
            Domingos: Cerrado
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Box sx={{ maxWidth: 800, width: '100%' }}>
          <Box sx={{ color: '#fff', padding: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Nuestra Misión
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
              En la Abarrotera de Temixco, nuestra misión es ofrecer productos de alta calidad y variedad a precios accesibles para satisfacer las necesidades de nuestros clientes, contribuyendo al bienestar de la comunidad.
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
              Nos esforzamos por brindar un servicio excepcional, fomentando la confianza y la lealtad de nuestros clientes a través de un enfoque en la excelencia y la responsabilidad social.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Box sx={{ maxWidth: 800, width: '100%', padding: 2, color: '#fff' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Nuestra Visión
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
            Ser la cadena de abarrotes líder en la región, reconocida por nuestra calidad, servicio y compromiso con la comunidad, expandiendo nuestra presencia y mejorando continuamente.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Box sx={{ maxWidth: 800, width: '100%', padding: 2, color: '#fff' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Nuestro Objetivo
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
            Mantener una oferta competitiva y accesible, enfocándonos en la satisfacción del cliente, la innovación y la eficiencia operativa para garantizar el crecimiento y la sostenibilidad de nuestro negocio.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1, mb: 4 }}>
        <Box sx={{ maxWidth: 800, width: '100%', padding: 2, color: '#fff' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Nuestra Historia
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
            La Abarrotera de Temixco fue fundada en 1995 con el objetivo de proporcionar productos de primera necesidad a la comunidad local. Desde entonces, hemos crecido y evolucionado, adaptándonos a los cambios del mercado y siempre buscando la satisfacción de nuestros clientes. Nuestra trayectoria está marcada por un compromiso constante con la calidad y el servicio.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
