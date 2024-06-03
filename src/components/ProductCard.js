import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { orange } from '@mui/material/colors';

const orange400 = orange[400];

export default function ProductCard({ product }) {
  return (
    <Card sx={{ display: 'flex', height: '200px', boxShadow: 0 }}>
      <CardMedia
        component="img"
        sx={{ width: 180, objectFit: 'cover' }}
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Precio: {product.price}
          </Typography>
        </div>
        <Button variant="contained"
          style={{ backgroundColor: orange400, color: 'white' }} s
          sx={{ alignSelf: 'flex-end', px: 1, py: 0.5 }}>
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};


export function ProductCardModal({ product }) {
  return (
    <Card sx={{ display: 'flex', height: '200px', boxShadow: 0 }}>
      <CardMedia
        component="img"
        sx={{ width: 180, objectFit: 'cover' }}
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Precio: {product.price}
          </Typography>
        </div>
        <Button variant="contained"
          style={{ backgroundColor: orange400, color: 'white' }} s
          sx={{ alignSelf: 'flex-end', px: 1, py: 0.5 }}>
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

