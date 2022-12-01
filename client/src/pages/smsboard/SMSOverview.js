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
import axios from "axios";
import {useAuthContext} from "../../hooks/useAuthContext"
import {useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import refreshIcon from "@mui/icons-material/Refresh";
import Button from '@mui/material/Button'

const api_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL;


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
      <div>
        <Tooltip title="Refresh">
          <Button variant="text" color="primary" onClick={()=>props.refresh()}>
            Refresh  
          </Button>
        </Tooltip>
        </div>
    </Toolbar>
  );
}

export default function SMSTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const {user} = useAuthContext();
  const getSMSs = async ()=>{
    const email=(user.email? user.email: user.user.email)
    console.log(email);
    axios.post(`${api_url}/sms/getRecords`,{user:email})
    .then((res)=>{
      if(res){
        setRows(res.data);
        rows.sort((a, b) => (a.sentDate < b.sentDate ? -1 : 1));
      }
    })
  };

  useEffect(()=>{
    getSMSs(user);
  },[]);

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
    <SMSTableToolbar refresh={()=>getSMSs()} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Sent Date</TableCell>
            <TableCell align="right">Code</TableCell>
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
                {row.code? row.code: "--"}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.amount ? row.amount : "--"}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.to}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.expireDate? row.expireDate: "--"}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.code? (row.active ? "active" : (row.expirationDate<new Date()? 'inactive':'expired' ) ):"--"}
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