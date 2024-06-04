import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber } from '@mui/material/colors';
import { Visibility, Edit, Cancel } from '@mui/icons-material';

export function Actions(props) {
    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    console.log('Ver');
                }}
            >
                <Tooltip title="Ver solicitud">
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
                <Tooltip title="Editar solicitud">
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
                    console.log('Cancelar');
                }}
            >
                <Tooltip title="Cancelar solicitud">
                    <Cancel
                        sx={{
                            color: red[900]
                        }}
                    />
                </Tooltip>
            </IconButton>
        </>
    )
}