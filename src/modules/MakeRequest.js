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
import Title from '@/components/Title';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Button, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';

function createData(id, name, amount) {
    return { id, name, amount, quantity: '0' };
}

const rows = [
    createData(0, 'Producto A', 312.44),
    createData(1, 'Producto B', 866.99),
    createData(2, 'Producto C', 100.81),
    createData(3, 'Producto D', 654.39),
    createData(4, 'Producto E', 212.79),
    createData(5, 'Producto F', 150.00),
    createData(6, 'Producto G', 820.42),
    createData(7, 'Producto H', 732.18),
    createData(8, 'Producto I', 319.29),
    createData(9, 'Producto J', 912.34),
    createData(10, 'Producto K', 615.67),
    createData(11, 'Producto L', 732.81),
    createData(12, 'Producto M', 501.45),
    createData(13, 'Producto N', 673.12),
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
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre del producto' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Total adeudado' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Cantidad' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all requests',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={props.orderBy === headCell.id ? props.order : false}
                    >
                        <TableSortLabel
                            active={props.orderBy === headCell.id}
                            direction={props.orderBy === headCell.id ? props.order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {props.orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function MakeRequestComponent(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchText, setSearchText] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilteredRows(
                rows.filter((row) =>
                    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.amount.toString().toLowerCase().includes(searchText.toLowerCase())
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

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = filteredRows.map((row) => row.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
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

    const handleQuantityChange = (event, id) => {
        const newValue = event.target.value;
        if (/^\d*$/.test(newValue)) {
            const updatedRows = filteredRows.map((row) => {
                if (row.id === id) {
                    return { ...row, quantity: newValue };
                }
                return row;
            });
            setFilteredRows(updatedRows);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedRows = filteredRows.filter((row) => selected.includes(row.id));

        if (selectedRows.length === 0) {
            setSnackbarMessage('Por favor, seleccione al menos una fila.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const invalidRows = selectedRows.filter((row) => row.quantity === '0' || row.quantity === '');
        if (invalidRows.length > 0) {
            setSnackbarMessage('Por favor, asegúrese de que todas las cantidades seleccionadas sean mayores a 0.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const selectedData = selectedRows.map((row) => ({
            id: row.id,
            name: row.name,
            amount: row.amount,
            quantity: row.quantity,
        }));

        console.log('Datos seleccionados:', selectedData);
        setSnackbarMessage('Datos enviados correctamente.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

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
            <Title>Realizar pedido</Title>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <TextField
                    label="Buscar"
                    variant="filled"
                    sx={{
                        width: '100%',
                        maxWidth: '400px',
                    }}
                    value={searchText}
                    onChange={handleSearchTextChange}
                    InputProps={{
                        endAdornment: (
                            <Search color="disabled" />
                        ),
                    }}
                />
            </Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TableContainer>
                        <Table size="small">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={filteredRows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    type="text"
                                                    value={row.quantity}
                                                    onChange={(event) => handleQuantityChange(event, row.id)}
                                                    inputProps={{ pattern: "[0-9]*", min: 1 }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Enviar
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}


