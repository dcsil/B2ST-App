import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from "axios";
import Traffic from './Traffic';
import DashboardPageProvider from '../../components/DashboardPageProvider';
const print = console.log

const list = [
  {
    gridProps: { xs: 12, md: 8, lg: 9 },
    paperProps: {
      sx:{ p: 2, display: 'flex', flexDirection: 'column', height: 240 },
    },
    children: <Chart />,
  },
  {
    gridProps: { xs: 12, md: 4, lg: 3 },
    paperProps: {
      sx: { p: 2, display: 'flex', flexDirection: 'column', height: 240 },
    },
    children: <Deposits />,
  },
  {
    gridProps: { xs: 12 },
    paperProps: {
      sx:{ p: 2, display: 'flex', flexDirection: 'column' },
    },
    children: <Orders />,
  },
  {
    gridProps: { xs: 12 },
    paperProps: {
      sx:{ p: 2, display: 'flex', flexDirection: 'column' },
    },
    children: <Traffic />,
  },
];

function DashboardContent() {
  const {user} = useAuthContext()

  const getPlan = async ()=>{
    print(user.email)
    const {data: plan} = await axios.post("http://localhost:5000/subs", {email: user.email})
    print(plan)
  }

  return (
    <DashboardPageProvider name="Dashboard">
      <Grid container spacing={3}>
        {list.map((listItem, index) => (
          <Grid item {...listItem.gridProps} key={index}>
            <Paper {...listItem.paperProps}>
              {listItem.children}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DashboardPageProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
