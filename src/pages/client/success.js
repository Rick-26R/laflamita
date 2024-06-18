import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Head from 'next/head';
import MenuDash from '@/modules/MenuDash';
import ContentAdmin from '@/modules/ContentAdmin';
import ContentUser from '@/modules/ContentUser';
import ProductOrder from '@/components/ProductOrder';

export default function success() {

  return (
    <>
      <Head>
        <title>Compra exitosa</title>
      </Head>
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
          <ProductOrder />
        </Box>
      </Box>
    </>
  );
}