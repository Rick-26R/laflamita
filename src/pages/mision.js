import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

export default function Mision() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', padding: '50px 0' }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Card sx={{ maxWidth: 800, width: '100%', boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)',  borderRadius: '16px'}}>
          <CardMedia
            component="img"
            alt="Abarrotera de Temixco"
            height="250"
            image="/mision.png"
            title="Abarrotera de Temixco"
            sx={{ objectFit: 'contain', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
          />
          <CardContent sx={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
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

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 800, width: '100%', boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)', borderRadius: '16px' }}>
          <CardMedia
            component="img"
            alt="Nuestra Visión"
            height="250"
            image="/vision.png"
            title="Nuestra Visión"
            sx={{ objectFit: 'contain', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
          />
          <CardContent sx={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Nuestra Visión
            </Typography>
            <Typography variant="body1" paragraph>
              Ser la cadena de abarrotes líder en la región, reconocida por nuestra calidad, servicio y compromiso con la comunidad, expandiendo nuestra presencia y mejorando continuamente.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 800, width: '100%', boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)', borderRadius: '16px' }}>
          <CardMedia
            component="img"
            alt="Nuestro Objetivo"
            height="250"
            image="/objetivo.png"
            title="Nuestro Objetivo"
            sx={{ objectFit: 'contain', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
          />
          <CardContent sx={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Nuestro Objetivo
            </Typography>
            <Typography variant="body1" paragraph>
              Mantener una oferta competitiva y accesible, enfocándonos en la satisfacción del cliente, la innovación y la eficiencia operativa para garantizar el crecimiento y la sostenibilidad de nuestro negocio.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 800, width: '100%', boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)', borderRadius: '16px' }}>
          <CardMedia
            component="img"
            alt="Horarios de Atención"
            height="250"
            image="/horarios.png"
            title="Horarios de Atención"
            sx={{ objectFit: 'contain', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
          />
          <CardContent sx={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Horarios de Atención
            </Typography>
            <Typography variant="body1" paragraph>
              Lunes a Viernes: 8:00 AM - 10:00 PM
            </Typography>
            <Typography variant="body1" paragraph>
              Sábados: 8:00 AM - 1:00 PM
            </Typography>
            <Typography variant="body1" paragraph>
              Domingos: Cerrado
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Card sx={{ maxWidth: 800, width: '100%', boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)', borderRadius: '16px' }}>
          <CardMedia
            component="img"
            alt="Nuestra Historia"
            height="250"
            image="/historia.png"
            title="Nuestra Historia"
            sx={{ objectFit: 'contain', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
          />
          <CardContent sx={{ textAlign: 'center', color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Nuestra Historia
            </Typography>
            <Typography variant="body1" paragraph>
              La Abarrotera de Temixco fue fundada en 1995 con el objetivo de proporcionar productos de primera necesidad a la comunidad local. Desde entonces, hemos crecido y evolucionado, adaptándonos a los cambios del mercado y siempre buscando la satisfacción de nuestros clientes. Nuestra trayectoria está marcada por un compromiso constante con la calidad y el servicio.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
