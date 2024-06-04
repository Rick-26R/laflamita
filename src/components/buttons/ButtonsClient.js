import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber } from '@mui/material/colors';
import { Delete, Visibility, Block, Edit } from '@mui/icons-material';

export function Actions(props) {
    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    console.log('Ver');
                }}
            >
                <Tooltip title="Ver cliente">
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
                <Tooltip title="Editar cliente">
                    <Edit
                        sx={{
                            color: amber[900]
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
                onClick={() => {
                    console.log('Bloquear');
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