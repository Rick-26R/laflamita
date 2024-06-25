import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber, green } from '@mui/material/colors';
import { Delete, Visibility, Block, Edit, Check } from '@mui/icons-material';
import axios from 'axios';
import { getToken } from '../../../utils/CookiesUtils';
import Router from 'next/router';

export function NotBlocked(props) {
    console.log(props);
    return (
        <>
            <IconButton
                aria-label="delete"
                onClick={async () => {
                    try {
                        const response = await axios.delete(`/api/clients/${props.id}`, {
                            headers: {
                                'Authorization': `Bearer ${getToken()}`,
                            }
                        });

                        if (response.status === 200) {
                            setTimeout(() => {
                                Router.reload();
                            }, 2000);
                        }
                    } catch (error) {
                        console.log(error);
                    }

                }}
            >
                <Tooltip title="Eliminar cliente">
                    <Delete
                        sx={{
                            color: red[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

            <IconButton
                aria-label="block"
                onClick={async () => {
                    try {
                        const response = await axios.put(`/api/clients/${props.id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });

                        if (response.status === 200) {
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <Tooltip title="Bloquear cliente">
                    <Block
                        sx={{
                            color: red[900]
                        }}
                    />
                </Tooltip>
            </IconButton>
        </>
    )
}
export function Blocked(props) {
    return (
        <>
            <IconButton
                aria-label="delete"
                onClick={async () => {
                    try {
                        const response = await axios.delete(`/api/clients/${props.id}`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });

                        if (response.status === 200) {
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                }

            >
                <Tooltip title="Eliminar cliente">
                    <Delete
                        sx={{
                            color: red[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

            <IconButton
                aria-label="block"
                onClick={async () => {
                    try {
                        const response = await axios.put(`/api/clients/${props.id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });

                        if (response.status === 200) {
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                }
            >
                <Tooltip title="Desbloquear cliente">
                    <Check
                        sx={{
                            color: green[900]
                        }}
                    />
                </Tooltip>
            </IconButton>
        </>
    )
}