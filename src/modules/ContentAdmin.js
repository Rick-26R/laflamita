import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from '@/components/Deposits';
import Orders from '@/modules/Orders';
import Chart from '@/components/Chart';
import Title from '@/components/Title';
import { Box } from '@mui/material';
import Copyright from '@/components/Copyright';


export default function ContentAdmin() {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            labels: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        tension: 0.2,
        labels: {
            font: {
                size: 14,
            },
        },
        maintainAspectRatio: false,
    };

    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const data = {
        labels,
        datasets: [
            {
                data: [600, 690, 700, 1500, 1200, 800, 1000, 900, 1100, 1000, 1200, 1300],
                borderColor: 'rgb(217, 58, 38)',
                backgroundColor: 'rgba(217, 58, 38, 0.5)',
            },
            {
                data: [500, 450, 1000, 1100, 600, 600, 800, 700, 900, 800, 1000, 1100],
                borderColor: 'rgb(254, 193, 193)',
                backgroundColor: 'rgba(254, 193, 193, 0.5)',
            },
        ],
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Title>Ventas</Title>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Chart
                                    data={data}
                                    options={options}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: 240,
                            }}
                        >
                            <Deposits />
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Orders rows={[5]} />
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </>
    )
}
