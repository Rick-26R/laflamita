import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../cmp/compras'; // Mantenemos el import existente

const ComprasPage = () => {
  const products = [
    { id: 1, name: 'Manzana', description: 'Manzana fresca', price: '$1.99', imageUrl: 'https://www.smartnfinal.com.mx/wp-content/uploads/2016/08/99552-MANZANA-ROJA.jpg'},
    { id: 2, name: 'Plátano', description: 'Plátano maduro', price: '$0.99', imageUrl: 'https://www.smartnfinal.com.mx/wp-content/uploads/2016/08/99555-PLATANO-PORTALIMON.jpg'},
    { id: 3, name: 'Naranja', description: 'Naranja recién cosechada', price: '$2.99', imageUrl: 'https://static9.depositphotos.com/1642482/1148/i/450/depositphotos_11489364-stock-photo-ripe-orange.jpg'},
    { id: 4, name: 'Pera', description: 'Pera jugosa', price: '$1.49', imageUrl: 'https://www.nutricionyentrenamiento.fit/images/alimento/248.jpg' },	
    { id: 5, name: 'Uva', description: 'Uva sin semillas', price: '$3.99', imageUrl: 'https://www.recetasnestle.com.mx/sites/default/files/inline-images/uva-roja-y-uva-verde.jpg'},
    { id: 6, name: 'Sandía', description: 'Sandía grande', price: '$5.99', imageUrl: 'https://www.soriana.com/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dwe39144d3/images/product/0000000001229_A.jpg?sw=445&sh=445&sm=fit' },
    { id: 7, name: 'Melón', description: 'Melón dulce', price: '$4.99', imageUrl: 'https://www.centraladomicilio.com/cdn/shop/products/melon_cantaloup_a93e2ef1-c351-4547-acfe-a48b308ca118.jpg?v=1535138500' },
    { id: 8, name: 'Piña', description: 'Piña fresca', price: '$2.99', imageUrl: 'https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000'},
    { id: 9, name: 'Mango', description: 'Mango maduro', price: '$1.99', imageUrl: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00000000004961L1.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
    { id: 10, name: 'Papaya', description: 'Papaya grande', price: '$3.99', imageUrl: 'https://www.soriana.com/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw3b23182a/images/product/0000000002004_B.jpg?sw=445&sh=445&sm=fit'},
    { id: 11, name: 'Fresa', description: 'Fresa fresca', price: '$2.99', imageUrl: 'https://static.libertyprim.com/files/familles/fraise-large.jpg?1569271765'},
    { id: 12, name: 'Kiwi', description: 'Kiwi fresco', price: '$1.99', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwYmmAgfpX98Sn02toRhfIFf6T0wRWMurXCA&s'}
  ];


  return (
    <Container sx={{margin: '0 auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Productos del Supermercado
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} xl={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ComprasPage;
