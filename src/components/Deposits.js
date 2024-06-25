import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Box } from '@mui/material';
import axios from 'axios';
import { getToken } from '../../utils/CookiesUtils';

export default function Deposits() {
    const [income, setIncome] = React.useState(0);

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    React.useEffect(() => {
        const fetchIncome = async () => {
            const token = getToken();
            const response = await axios.get('/api/dashboard/income', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setIncome(response.data.data);
        }

        fetchIncome();
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Title>Ingresos esperados</Title>
                <Typography component="p" variant="h4">
                    $ {parseFloat(income).toFixed(2)}
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().getDate() + ' de ' + meses[new Date().getMonth()] + ' de ' + new Date().getFullYear()}
                </Typography>
            </Box>
        </React.Fragment>
    );
}