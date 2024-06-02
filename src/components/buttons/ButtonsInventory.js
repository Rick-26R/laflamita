import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber } from '@mui/material/colors';
import { Visibility, Edit, Delete } from '@mui/icons-material';

export function Actions(props) {
    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    console.log('Ver');
                }}
            >
                <Tooltip title="Ver Usuario">
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
                <Tooltip title="Editar Usuario">
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