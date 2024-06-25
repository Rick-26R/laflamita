import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { orange } from '@mui/material/colors';

const orange400 = orange[400];

export default function ProductCard({ product }) {
  console.log('ProductCard:', product);

  const addToCart = (product) => {
    console.log('Añadir al carrito:', product);
    const item = {
      id: product.id,
      name: product.name,
      price: product.costPublic,
      quantity: 1,
      image: product.image
    };

    // Obtener el carrito actual de localStorage (parseando el JSON)
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": []}');

    // Verificar si el producto ya está en el carrito
    const itemExists = cart.items.find(cartItem => cartItem.id === item.id);

    if (!itemExists) {
      // Agregar el producto al carrito
      const updatedCart = {
        ...cart,
        items: [...cart.items, item]
      };

      // Guardar el carrito actualizado en localStorage (stringify el JSON)
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      console.log('El producto ya está en el carrito:', item);
    }
  };

  return (
    <Card sx={{ display: 'flex', height: '200px', boxShadow: 0 }}>
      <CardMedia
        component="img"
        sx={{ width: 180, objectFit: 'cover' }}
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Precio: {product.costPublic}
          </Typography>
        </div>
        <Button variant="contained"
          style={{ backgroundColor: orange400, color: 'white' }}
          sx={{ alignSelf: 'flex-end', px: 1, py: 0.5 }}
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
}


export function ProductCardModal({ product }) {
  console.log('ProductCardModal:', product);
  return (
    <Card sx={{ display: 'flex', height: '200px', boxShadow: 0 }}>
      <CardMedia
        component="img"
        sx={{ width: 180, objectFit: 'cover' }}
        image={product.imaage}
        alt={product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Precio: {product.costPublic}
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

