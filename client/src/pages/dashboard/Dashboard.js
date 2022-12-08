import * as React from 'react';
import { Container,Grid,Paper } from '@mui/material';
import Traffic from './Traffic';
import DashboardPageProvider from '../../components/PageProvider/DashboardPageProvider';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
const itemProps = (grid,children) => ({
  gridProps: {xs:12, ...grid},
  children: children
})

const list = [
  itemProps({md:8,lg:9}, <Chart />),
  itemProps({md:4,lg:3}, <Deposits />),
  itemProps({xs:12}, <Orders />),
  itemProps({xs:12}, <Traffic />),
];

function DashboardContent() {
  React.useEffect(() => {
    document.title = "B2ST | Dashboard";
  }, []);
  return (
    <DashboardPageProvider name="Dashboard">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#dde3ea" }}>
        <Grid container spacing={3}>
          {list.map((listItem, index) => (
            <Grid item {...listItem.gridProps} key={index}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height:'100%'}}>
                {listItem.children}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </DashboardPageProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
