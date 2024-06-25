import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber } from '@mui/material/colors';
import { Delete, Close, Edit } from '@mui/icons-material';
import { ProvidersFormPut } from '../forms/ProvidersForm';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { getToken } from '../../../utils/CookiesUtils';
import Router from 'next/router';

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

export function Actions(props) {
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
                <Tooltip title="Editar proveedor">
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
                    <ProvidersFormPut data={props.data} />
                </Box>
            </Modal>

            <IconButton
                aria-label="delete"
                onClick={async () => {
                    try {
                        const response = await axios.delete(`/api/providers/${props.data.id}`, {
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
                <Tooltip title="Eliminar proveedor">
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