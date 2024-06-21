import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Title from '../components/Title';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';
import { Actions } from '@/components/buttons/ButtonsInventory';
import { Chip, Button, Stack, Modal, IconButton } from '@mui/material';
import ProductForm from '@/components/forms/ProductForm';
import { Close } from '@mui/icons-material';
import CategoryForm from '@/components/forms/CategoryForm';

function createData(id, date, expirate, name, category, amount, cost, quantity) {
    return { id, date, expirate, name, category, amount, cost, quantity };
}


const rows = [
    createData(0, '16/09/2021', '16/09/2022', 'Producto 1', 'Categoria 1', 100, 150, 10),
    createData(1, '16/09/2021', '16/09/2022', 'Producto 2', 'Categoria 1', 100, 150, 10),
    createData(2, '16/09/2021', '16/09/2022', 'Producto 3', 'Categoria 2', 100, 150, 10),
    createData(3, '16/09/2021', '16/09/2022', 'Producto 4', 'Categoria 2', 100, 150, 10),
    createData(4, '16/09/2021', '16/09/2022', 'Producto 5', 'Categoria 3', 100, 150, 10),
    createData(5, '16/09/2021', '16/09/2022', 'Producto 6', 'Categoria 3', 100, 150, 10),
    createData(6, '16/09/2021', '16/09/2022', 'Producto 7', 'Categoria 4', 100, 150, 10),
    createData(7, '16/09/2021', '16/09/2022', 'Producto 8', 'Categoria 4', 100, 150, 10),
    createData(8, '16/09/2021', '16/09/2022', 'Producto 9', 'Categoria 5', 100, 150, 10),
    createData(9, '16/09/2021', '16/09/2022', 'Producto 10', 'Categoria 5', 100, 150, 10),
    createData(10, '16/09/2021', '16/09/2022', 'Producto 11', 'Categoria 6', 100, 150, 10),
    createData(11, '16/09/2021', '16/09/2022', 'Producto 12', 'Categoria 6', 100, 150, 10),
    createData(12, '16/09/2021', '16/09/2022', 'Producto 13', 'Categoria 7', 100, 150, 10),
    createData(13, '16/09/2021', '16/09/2022', 'Producto 14', 'Categoria 7', 100, 150, 10),
    createData(14, '16/09/2021', '16/09/2022', 'Producto 15', 'Categoria 8', 100, 150, 10),
    createData(15, '16/09/2021', '16/09/2022', 'Producto 16', 'Categoria 8', 100, 150, 10),
];

const rowsPerPageOptions = rows.map((row, index) => {
    if (index % 5 === 0 && index !== 0 && index <= 25) {
        return index;
    }
}).filter((row) => row !== undefined);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'date', numeric: false, disablePadding: false, label: 'Fecha de ingreso' },
    { id: 'expirate', numeric: false, disablePadding: false, label: 'Fecha de vencimiento' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Categoria' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Costo' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Costo al publico' },
    { id: 'cost', numeric: true, disablePadding: false, label: 'Cantidad' },
];

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

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    align='center'
                    padding='normal'
                >
                    Acciones
                </TableCell>
            </TableRow>
        </TableHead>
    );
}


export default function Inventory(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchText, setSearchText] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState(rows);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilteredRows(
                rows.filter((row) =>
                    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.category.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.date.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.amount.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                    row.expirate.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.quantity.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                    row.cost.toString().toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const visibleRows = React.useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [filteredRows, order, orderBy, page, rowsPerPage],
    );

    return (
        <React.Fragment>
            <Title>Inventario</Title>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
            }}>
                <TextField
                    label="Buscar"
                    variant="filled"
                    sx={{
                        width: '100%',
                        maxWidth: '400px',
                    }}
                    value={searchText}
                    onChange={handleSearchTextChange}
                    InputProps={
                        {
                            endAdornment: (
                                <Search color="disabled" />
                            )
                        }}
                />
                <Stack direction='row' spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        href='/admin/inventory/add-product'
                    >
                        Agregar producto
                    </Button>

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
                            <CategoryForm />
                        </Box>
                    </Modal>
                    
                </Stack>
            </Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table size="small">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.expirate}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.category}
                                            color="secondary"
                                            variant="outlined"
                                            size='small'
                                        />
                                    </TableCell>
                                    <TableCell align="right">{`$${row.amount}`}</TableCell>
                                    <TableCell align="right">{`$${row.cost}`}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell
                                        align='center'
                                        padding='normal'
                                    >

                                        <Actions id={row.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={props.rows || rowsPerPageOptions}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment >
    );

}

