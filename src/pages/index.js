import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Container, TextField } from '@mui/material'
import React from 'react'
import Link from 'next/link';




export default function index() {
    return (
        <>
            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',

                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column',
                    }}
                >
                    <form>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh',
                                padding: '20px',
                                flexDirection: 'column',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                            }}
                        >
                            <Typography variant="h1" fontSize={30}>
                                Iniciar Sesion
                            </Typography>

                            <TextField id="correo-basic" label="Correo" variant="outlined"
                                style={{
                                    margin: '20px',
                                    width: '90%',
                                }}
                            />
                            <TextField id="Password-basic" label="Password" variant="outlined"
                            type="password"
                                style={{
                                    marginBottom: '30px',
                                    width: '90%',
                                }}
                            />

                            <Button color="success" size="large" variant="outlined"
                                width="100%"
                            >
                                Iniciar Sesion
                            </Button>

                            <Typography variant="p" fontSize={18}
                                style={{
                                    marginTop: '10px',
                                }}
                            >
                                ¿No tienes cuenta? <Link href="/signup"
                                    style={{
                                        textDecoration: 'none',
                                        color: '#388e3c',
                                    }}
                                >Registrate</Link>
                            </Typography>
                        </Box>

                    </form>
                </Box >
            </Container >
        </>
    )
}