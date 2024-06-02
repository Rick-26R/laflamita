import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, green, blue, grey, amber } from '@mui/material/colors';
import { Delete, Check, Visibility, LocalPrintshop, Edit } from '@mui/icons-material';

export function Actions(props) {
    return (
        <>
            <IconButton
                aria-label="view"
                onClick={() => {
                    console.log('Ver');
                }}
            >
                <Tooltip title="Ver proveedor">
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
                <Tooltip title="Editar proveedor">
                    <Edit
                        sx={{
                            color: amber[900]
                        }}
                    />
                </Tooltip>
            </IconButton>
        </>
    )
}