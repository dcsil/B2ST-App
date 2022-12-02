import * as React from 'react';
import { Container,Grid,Toolbar,Box,Paper} from '@mui/material';
import DashboardPageProvider from '../../components/PageProvider/DashboardPageProvider';


function PromotionForecastContent() {
  return (
    <DashboardPageProvider name="Campaigns/Promotion Forecast" backto='/dashboard/campaigns'>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            </Grid>
          </Container>
    </DashboardPageProvider>
  );
}

export default function PromotionForecasting() {
  return <PromotionForecastContent />;
}