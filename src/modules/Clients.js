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
import { Blocked, NotBlocked } from '../components/buttons/ButtonsClient';
import axios from 'axios';
import { getToken } from '../../utils/CookiesUtils';

function createData(id, name, mail, status) {
    return { id, name, mail, status };
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'mail', numeric: false, disablePadding: false, label: 'Correo' },
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

export default function Clients(props) {
    const [rows, setRows] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchText, setSearchText] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState([]);

    React.useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await axios.get('/api/clients', {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });
                const clients = res.data.data;
                const formattedRows = clients.map(client => createData(client._id, `${client.name} ${client.lastname}`, client.email, client.status));
                setRows(formattedRows);
                setFilteredRows(formattedRows);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilteredRows(
                rows.filter((row) =>
                    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.mail.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText, rows]);

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
            <Title>Clientes</Title>
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
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.mail}</TableCell>
                                    <TableCell
                                        align='center'
                                        padding='normal'
                                    >
                                        {row.status === 'active' ? (<Blocked id={row.id} />) : (<NotBlocked id={row.id} />)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
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
