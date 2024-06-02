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
import Title from './Title';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';
import { ButtonsNotPaid } from './ButtonOrders';
import { ButtonsPaid } from './ButtonOrders';

function createData(id, date, name, shipTo, amount, status) {
    return { id, date, name, shipTo, amount, status };
}


const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 312.44, 'Esperando pago'),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 866.99, 'Esperando pago'),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 100.81, 'Esperando pago'),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 654.39, 'Esperando pago'),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 212.79, 'Esperando pago'),
    createData(5, '15 Mar, 2019', 'Whitney Houston', 'Newark, NJ', 150.00, 'Esperando pago'),
    createData(6, '14 Mar, 2019', 'Janis Joplin', 'Port Arthur, TX', 400.67, 'Esperando pago'),
    createData(7, '13 Mar, 2019', 'Jimi Hendrix', 'Seattle, WA', 820.42, 'Esperando pago'),
    createData(8, '13 Mar, 2019', 'Kurt Cobain', 'Aberdeen, WA', 732.18, 'Esperando pago'),
    createData(9, '12 Mar, 2019', 'Jim Morrison', 'Melbourne, FL', 319.29, 'Esperando pago'),
    createData(10, '12 Mar, 2019', 'John Lennon', 'Liverpool, UK', 912.34, 'Esperando pago'),
    createData(11, '11 Mar, 2019', 'Freddie Mercury', 'Stone Town, Tanzania', 615.67, 'Esperando pago'),
    createData(12, '11 Mar, 2019', 'David Bowie', 'London, UK', 732.81, 'Pagado'),
    createData(13, '10 Mar, 2019', 'Prince', 'Minneapolis, MN', 501.45, 'Pagado'),
    createData(14, '10 Mar, 2019', 'Tina Turner', 'Nutbush, TN', 673.12, 'Pagado'),
    createData(15, '09 Mar, 2019', 'Axl Rose', 'Lafayette, IN', 342.79, 'Pagado'),
    createData(16, '09 Mar, 2019', 'Billy Joel', 'New York, NY', 423.67, 'Pagado'),
    createData(17, '08 Mar, 2019', 'Madonna', 'Bay City, MI', 678.99, 'Pagado'),
    createData(18, '08 Mar, 2019', 'Stevie Wonder', 'Saginaw, MI', 812.44, 'Pagado'),
    createData(19, '07 Mar, 2019', 'Elton John', 'Pinner, UK', 765.67, 'Pagado'),
    createData(20, '07 Mar, 2019', 'Bob Dylan', 'Duluth, MN', 541.39, 'Pagado'),
    createData(21, '06 Mar, 2019', 'Ray Charles', 'Albany, GA', 332.44, 'Pagado'),
    createData(22, '06 Mar, 2019', 'James Brown', 'Barnwell, SC', 292.68, 'Pagado'),
    createData(23, '05 Mar, 2019', 'Aretha Franklin', 'Memphis, TN', 423.78, 'Pagado'),
    createData(24, '05 Mar, 2019', 'Mick Jagger', 'Dartford, UK', 754.12, 'Pagado'),
    createData(25, '04 Mar, 2019', 'Eric Clapton', 'Ripley, UK', 612.30, 'Pagado'),
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
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'shipTo', numeric: false, disablePadding: false, label: 'Ship To' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Sale Amount' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

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


export default function Orders(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchText, setSearchText] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState(rows);

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilteredRows(
                rows.filter((row) =>
                    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.date.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.shipTo.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.amount.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                    row.status.toLowerCase().includes(searchText.toLowerCase())
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
            <Title>Ordenes Recientes</Title>
            <Box sx={{
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
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.shipTo}</TableCell>
                                    <TableCell align="right">{`$${row.amount}`}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}
                                    >

                                        {row.status === 'Esperando pago' ? (
                                            <ButtonsNotPaid />
                                        ) : (
                                            <ButtonsPaid />
                                        )}

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
