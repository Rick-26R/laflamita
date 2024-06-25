import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber } from '@mui/material/colors';
import { Visibility, Edit, Delete, Close } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ProductCardModal } from '../ProductCard';
import ProductFormUpdate from '../forms/ProductFormUpdate';
import axios from 'axios';
import Router from 'next/router';
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

const product = { id: 1, name: 'Manzana', description: 'Manzana fresca', price: '$19.99', imageUrl: 'https://www.smartnfinal.com.mx/wp-content/uploads/2016/08/99552-MANZANA-ROJA.jpg' }



export function Actions(props) {
    console.log(props);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    handleOpen();
                }}
            >
                <Tooltip title="Ver producto(s)">
                    <Visibility
                        sx={{
                            color: blue[900]
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
                    <ProductCardModal product={props.data} />
                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose1}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <Close />
                    </IconButton>
                    <ProductFormUpdate data={props.data} />
                </Box>
            </Modal>

            <IconButton
                aria-label="print"
                onClick={() => {
                    console.log('Imprimir');
                }}
            >
                <Tooltip title="Editar producto(s)">
                    <Edit
                        sx={{
                            color: amber[900]
                        }}
                        onClick={handleOpen1}
                    />
                </Tooltip>
            </IconButton>



            <IconButton
                aria-label="delete"
                onClick={async () => {
                    console.log('Eliminar');
                    console.log(props.data.id);
                    try {
                        const response = await axios.delete(`/api/inventory/${props.data.id}`, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        });

                        console.log(response);

                        if (response.status === 200) {
                            console.log('Producto eliminado');
                            Router.reload();
                        }


                    } catch (error) {

                    }
                }}
            >
                <Tooltip title="Eliminar producto(s)">
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