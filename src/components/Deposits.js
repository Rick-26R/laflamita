import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Box } from '@mui/material';

export default function Deposits() {
    return (
        <React.Fragment>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Title>Ingresos esperados</Title>
                <Typography component="p" variant="h4">
                    $3,024.00
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    15 de Marzo, 2019
                </Typography>
            </Box>
        </React.Fragment>
    );
}