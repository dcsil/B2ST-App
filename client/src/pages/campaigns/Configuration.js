import * as React from 'react';
import {Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Card, CardHeader,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PromotionLimitDialog from './PromotionLimitDialog';

export default function ConfigTable(props) {
  const navigate=useNavigate();
  const [open,setOpen] = React.useState(false);

  const rows = [
    {
        name:'Promotion Limit',
        button: '50%',
        onclick: () => {setOpen(true)}
    },
    {
        name:'Order Timing',
        button: 'Calender',
        onclick: () => {}
    },
    {
        name:'Promotion Forecasting',
        button: 'View',
        onclick: ()=>{navigate('../dashboard/campaigns/forecasting')}
    }
];

  return (
    <Card >
      <CardHeader title='Configuration'/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TableContainer>
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
                        <Button onClick={()=>row.onclick()}>{row.button}</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PromotionLimitDialog
            open={open}
            closeDialog={() => setOpen(false)}
          />
      </Box>
    </Card>
  );
}