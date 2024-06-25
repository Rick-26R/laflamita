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
import axios from 'axios';
import { getToken } from '../../utils/CookiesUtils';


export default function ContentAdmin() {
    const [dataFetch, setDataFetch] = React.useState([]);

    React.useEffect(() => {
        const fetchLabels = async () => {
            try {
                const response = await axios.get('/api/dashboard/chart', {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                setDataFetch(response.data.data);
                console.log(response.data.data);
                
            } catch (error) {
                console.error(error);
            }
        }

        

        fetchLabels();
    }, []);


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


    const data = { 
        labels: dataFetch.labels,
        datasets: [
            {
                data: dataFetch.data,
                borderColor: 'rgb(217, 58, 38)',
                backgroundColor: 'rgba(217, 58, 38, 0.5)',
            }
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
