import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, green, blue, grey, amber } from '@mui/material/colors';
import { Delete, Check, Visibility, LocalPrintshop, Close } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ProductOrderModal } from '../ProductOrder';


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


export function ButtonsNotPaid(props) {
    console.log(props);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    handleOpen();
                }}
            >
                <Tooltip title="Ver orden">
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
                    <ProductOrderModal data={props.data}/>
                </Box>
            </Modal>
            <IconButton
                aria-label="pay"
                onClick={() => {
                    console.log('Pagar');
                }}
            >
                <Tooltip title="Confirmar pago">
                    <Check
                        sx={{
                            color: green[900]
                        }}
                    />

                </Tooltip>
            </IconButton>

            <IconButton
                aria-label="delete"
                onClick={() => {
                    console.log('Eliminar');
                }}
            >
                <Tooltip title="Eliminar orden">
                    <Delete sx={{ color: red[900] }}
                    />
                </Tooltip>
            </IconButton>
        </>
    )
}

export function ButtonsPaid(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    handleOpen();
                }}
            >
                <Tooltip title="Ver orden">
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
                    <ProductOrderModal />
                </Box>
            </Modal>

            <IconButton
                aria-label="print"
                onClick={() => {
                    console.log('Imprimir');
                }}
            >
                <Tooltip title="Imprimir ticket">
                    <LocalPrintshop
                        sx={{
                            color: grey[500]
                        }}
                    />
                </Tooltip>
            </IconButton>
        </>
    )
}