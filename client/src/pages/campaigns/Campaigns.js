import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardAppBar from '../dashboard/DashboardAppBar';
import { Container,Grid,Toolbar,Box,Paper} from '@mui/material';
import AppChart from '../../sections/AppChart';
import Configuration from './Configuration';
import AppStatistics from "../../sections/AppStatistics";
import DashboardPageProvider from '../../components/DashboardPageProvider';

const cur_date=new Date();
const date=new Date();
date.setFullYear(cur_date.getFullYear()-1);
date.setDate(1);
const ordersLabels = [date.toLocaleString('en', { month: 'numeric', year: 'numeric',day:'numeric'})];
while (date.setMonth(date.getMonth() + 1) < cur_date) {
    ordersLabels.unshift(date.toLocaleString('en', { month: 'numeric', year: 'numeric', day:'numeric' }));
}

const statsData=[
    {
        name:'Customer Satisfaction Rate',
        value: '87%',
    },
    {
        name:'Customer Retention Rate',
        value: '42%',
    },
    {
        name:'Average Promotion Rate',
        value: '5%',
    },
    {
        name:'Ordering Trends (past 3 days)',
        value: '+300%',
    }
]

const ordersData=[
    {
        name: 'Item A',
        type: 'line',
        fill: 'solid',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,20,10],
    },
    {
        name: 'Item B',
        type: 'line',
        fill: 'solid',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43,30,0],
    },
    {
        name: 'Item C',
        type: 'line',
        fill: 'solid',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39,25,21],
    },
];

function CampaignsContent() {
  return (
    <DashboardPageProvider name="Campaigns">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppChart title='Orders' subheader='in last 12 months' chartLabels={ordersLabels} chartData={ordersData} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Configuration/>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppStatistics
              title="Statistics"
              list={statsData}
            />
          </Grid>
        </Grid>
      </Container>
    </DashboardPageProvider>
  );
}

export default function Campaigns() {
  return <CampaignsContent />;
}