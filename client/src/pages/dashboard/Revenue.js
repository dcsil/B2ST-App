import * as React from "react";
import { Container, Grid } from "@mui/material";
import AppChart from "../../sections/AppChart";
import AppAnalysis from "../../sections/AppAnalysis";
import DashboardPageProvider from "../../components/PageProvider/DashboardPageProvider";
import axios from "axios";

function RevenueContent() {
  const [ordersData, setOrdersData] = React.useState([]);
  const [ordersLabels, setOrdersLabels] = React.useState([]);
  React.useEffect(() => {
    axios.get(process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL+"/orders").then((res) => {
      const data = res.data;
      setOrdersData([
        {
          name: "Revenue",
          type: "line",
          fill: "solid",
          data: data.map((i) => i.price),
        }
      ]);
      setOrdersLabels(data.map((i) => i.date));
    });
    document.title = "B2ST | Dashboard"
  }, []);
  return (
    <DashboardPageProvider name="Dashboard">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppChart title="Revenue" subheader="Based on recent orders"
              chartLabels={ordersLabels}
              chartData={ordersData}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppAnalysis title="Analysis" />
          </Grid>
        </Grid>
      </Container>
    </DashboardPageProvider>
  );
}

export default function Revenue() {
  return <RevenueContent />;
}
