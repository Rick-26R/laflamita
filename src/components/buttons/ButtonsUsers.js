import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber, green } from '@mui/material/colors';
import { Visibility, Block, Edit, Delete, Check, Close } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UsersFormUpdate from '../forms/UsersFormUpdate';
import Router from 'next/router';
import axios from 'axios';
import { getToken } from '../../../utils/CookiesUtils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};


export function NotBlocked(props) {
    console.log(props);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>

            <IconButton
                aria-label="print"
                onClick={() => {
                    console.log('Imprimir');
                    handleOpen();
                }}
            >
                <Tooltip title="Editar Usuario">
                    <Edit
                        sx={{
                            color: amber[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <Close />
                    </IconButton>
                    <UsersFormUpdate data={props.data} />
                </Box>
            </Modal>


            <IconButton
                aria-label="block"
                onClick={async () => {
                    try {
                        const response = await axios.put(`/api/users/${props.data.id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        console.log(response);

                        if (response.status === 200) {
                            console.log('Usuario bloqueado');
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <Tooltip title="Bloquear Usuario">
                    <Block
                        sx={{
                            color: red[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

            <IconButton
                aria-label="delete"
                onClick={async () => {
                    try {
                        const response = await axios.delete(`/api/users/${props.data.id}`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        console.log(response);

                        if (response.status === 200) {
                            console.log('Usuario eliminado');
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                }
            >
                <Tooltip title="Eliminar Usuario">
                    <Delete
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
    console.log(props);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>

            <IconButton
                aria-label="print"
                onClick={() => {
                    console.log('Imprimir');
                    handleOpen();
                }}
            >
                <Tooltip title="Editar Usuario">
                    <Edit
                        sx={{
                            color: amber[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <Close />
                    </IconButton>
                    <UsersFormUpdate data={props.data} />
                </Box>
            </Modal>

            <IconButton
                aria-label="block"
                onClick={async () => {
                    try {
                        const response = await axios.put(`/api/users/${props.data.id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        console.log(response);

                        if (response.status === 200) {
                            console.log('Usuario desbloqueado');
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <Tooltip title="Desbloquear Usuario">
                    <Check
                        sx={{
                            color: green[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

            <IconButton
                aria-label="delete"
                onClick={async () => {
                    try {
                        const response = await axios.delete(`/api/users/${props.data.id}`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });
                        console.log(response);

                        if (response.status === 200) {
                            console.log('Usuario eliminado');
                            Router.reload();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <Tooltip title="Eliminar Usuario">
                    <Delete
                        sx={{
                            color: red[900]
                        }}
                    />
                </Tooltip>
            </IconButton>

        </>
    )
}