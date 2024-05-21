import Button from '@mui/material/Button';
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


                }}
            >
                <Box
                    sx={{
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
                                height: '65vh',
                                padding: '20px',
                                flexDirection: 'column',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                            }}
                        >
                            <Container>
                                <Typography variant="h1" fontSize={30}
                                    style={{
                                        marginBottom: '20px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Reagistrate
                                </Typography>
                                <TextField

                                    id="demo-helper-text-aligned"
                                    label="Nombre"
                                    style={{
                                        marginRight: '5px',
                                        marginBottom: '10px',
                                    }}
                                />
                                <TextField

                                    id="demo-helper-text-aligned-no-helper"
                                    label="Apellidos"
                                />
                            </Container>
                            <TextField id="correo-basic" label="Correo" variant="outlined"
                                style={{
                                    margin: '10px',
                                    width: '90%',
                                }}
                            />
                            <TextField id="Contraseña-basic" label="Contraseña" variant="outlined"
                            type="password"
                                style={{
                                    margin: '10px',
                                    width: '90%',
                                }}
                            />
                            <TextField id="Confirmar-basic" label="Confirmar contraseña"
                            type="password"
                            variant="outlined"
                                style={{
                                    margin: '10px',
                                    width: '90%',
                                }}
                            />
                            <Button color="success" size="large" variant="outlined"  
                                width="100%"
                            >
                                registrarse
                            </Button>
                            <Typography variant="p" fontSize={18}
                                style={{
                                    marginTop: '10px',
                                }}
                            >
                                ¿Ya eres usuario? <Link href="/"
                                    style={{
                                        textDecoration: 'none',
                                        color: '#388e3c',
                                    }}
                                >Iniciar sesión</Link>
                            </Typography>
                        </Box>


                    </form>

                </Box>
            </Container >
        </>
    )
}