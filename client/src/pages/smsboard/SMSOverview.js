import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';

function createData(type, sentDate, name, amount, recipient, expirationDate, status) {
  return { type, sentDate, name, amount, recipient, expirationDate, status };
}

const rows = [
  createData('One-Time', '2021-08-01', 'KHJAHSDAJ', 5.00, 'Tevan', '2021-08-21', 'Active'),
  createData('One-Time', '2021-08-09', 'AAJAKSDAJ', 3.00, 'Soso', '2021-12-31', 'Active'),
  createData('One-Time', '2021-05-11', 'KBJACODAJ', 15.00, 'Bing', '2021-09-30', 'Active'),
  createData('One-Time', '2021-08-01', 'CBJACWDAJ', 11.00, 'Bing', '2021-09-17', 'Inactive'),
  createData('One-Time', '2021-06-01', 'CABCDEDAJ', 20.00, 'Sandy', '2021-09-17', 'Inactive'),
  createData('One-Time', '2022-08-01', 'PBJAAWDAJ', 10.00, 'Frank', '2022-10-21', 'Inactive'),
  createData('One-Time', '2022-03-01', 'WIDJAICHC', 11.00, 'Bing', '2022-09-30', 'Inactive'),
].sort((a, b) => (a.sentDate < b.sentDate ? -1 : 1));

function SMSTableToolbar(props) {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
      >
        Promotion
      </Typography>
    </Toolbar>
  );
}

export default function SMSTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
  <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
    <SMSTableToolbar />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Sent Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Amount&nbsp;($)</TableCell>
            <TableCell align="right">Recipient</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name} hover tabIndex={-1} >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.sentDate}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.amount}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.recipient}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.expirationDate}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.status}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  </Box>
  );
}