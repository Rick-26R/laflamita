import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuDash from '@/modules/MenuDash';
import Products from '@/components/Products';
import { useEffect, useState } from 'react';

export default function ProductsPage() {

  return (
    <>
      <title>Productos</title>
      <Box sx={{ display: 'flex' }}>
        <MenuDash title="Productos" />
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
          <Products />
        </Box>
      </Box>
    </>
  );
}
