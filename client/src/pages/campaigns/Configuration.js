import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Toolbar,Typography } from '@mui/material';


function createData(name, phone) {
  return {
    name,
    phone
  };
}

const rows = [
    {
        name:'Promotion Limit',
        button: '50%',
        onclick: () => {}
    },
    {
        name:'Order Timing',
        button: 'Calender',
        onclick: () => {}
    },
    {
        name:'Promotion Forecasting',
        button: 'View',
        onclick: () => {}
    }
];

export default function EnhancedTable(props) {

  return (
    <Box sx={{ width: '100%' }}>
        <TableContainer>
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
            Configurations
            </Typography>
        </Toolbar>
          <Table
            aria-labelledby="tableTitle"
            size='medium'
            
          >
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    hover
                    tabIndex={-1}
                >
                    <TableCell
                        component="th"
                        scope="row"
                        padding="1"
                    >
                        {row.name}
                    </TableCell>
                    <TableCell align="left">
                        {row.button}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
}