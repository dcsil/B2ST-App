import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import DashboardAppBar from './DashboardAppBar';

import {useLogout} from "../../hooks/useLogout"
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from "axios";
import {useEffect} from "react"
import Traffic from './Traffic';
const print = console.log
const mdTheme = createTheme();

function DashboardContent() {
  

  const {logout} = useLogout()
  const {user} = useAuthContext()
  // useEffect(()=>{
  //   getPlan()
  // }, [])

  const getPlan = async ()=>{

    print(user.email)
    const {data: plan} = await axios.post("http://localhost:5000/subs", {"email": user.email})
    print(plan)
  }

  const handleLogout = async ()=>{
    logout()
  }

  return (
    
    <ThemeProvider theme={mdTheme}>
      
      <Box sx={{ display: 'flex' }}>
      
        <CssBaseline />
        
        <DashboardAppBar name="Dashboard"/>
        
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Traffic/>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
      </Box>

      <Button variant="secondary" onClick={handleLogout}> Log out</Button>{' '}
      <button onClick={getPlan}>get plan</button>

    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
