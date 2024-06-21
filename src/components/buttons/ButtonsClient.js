import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red, blue, amber, green } from '@mui/material/colors';
import { Delete, Visibility, Block, Edit, Check } from '@mui/icons-material';

export function NotBlocked(props) {
    return (
        <>
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
export function Blocked(props) {
    return (
        <>
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
                    console.log('Desbloquear');
                }}
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