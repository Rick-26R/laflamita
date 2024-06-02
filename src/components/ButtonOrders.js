import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, green, blue, grey, amber } from '@mui/material/colors';
import { Delete, Check, Visibility, LocalPrintshop, Edit } from '@mui/icons-material';

export function ButtonsNotPaid(props) {
    return (
        <>
            <IconButton
                aria-label="edit"
                onClick={() => {
                    console.log('Editar');
                }}
            >
                <Tooltip title="Editar orden">
                <Edit
                    sx={{
                        color: amber[900],
                    }}
                />
                </Tooltip>
            </IconButton>

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
    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    console.log('Ver');
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