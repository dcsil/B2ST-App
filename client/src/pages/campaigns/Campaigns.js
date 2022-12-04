import * as React from "react";
import { Container, Grid } from "@mui/material";
import AppChart from "../../sections/AppChart";
import Configuration from "./Configuration";
import AppStatistics from "../../sections/AppStatistics";
import DashboardPageProvider from "../../components/PageProvider/DashboardPageProvider";
import axios from "axios";
const statsData = [
  {
    name: "Customer Satisfaction Rate",
    value: "87%",
  },
  {
    name: "Customer Retention Rate",
    value: "42%",
  },
  {
    name: "Average Promotion Rate",
    value: "5%",
  },
  {
    name: "Ordering Trends (past 3 days)",
    value: "+300%",
  },
];

function CampaignsContent() {
  const [ordersData, setOrdersData] = React.useState([{
    name: "Item A",
    type: "line",
    fill: "solid",
    data: [],
  }]);
  const [ordersLabels, setOrdersLabels] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:5000/orders").then((res) => {
      const data = res.data;
      console.log("Initial data: ", data);
      setOrdersData([
        {
          name: "Orders",
          type: "line",
          fill: "solid",
          data: data.data,
        }
      ]);
      setOrdersLabels(data.labels);
    });
  }, []);
  React.useEffect(() => {
    console.log("Effect log 1: ", ordersData);
    console.log("Effect log 2: ", ordersLabels);
  }, [ordersData, ordersLabels]);
  return (
    <DashboardPageProvider name="Campaigns">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppChart
              title="Orders"
              subheader="in last 12 months"
              chartLabels={ordersLabels}
              chartData={ordersData}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Configuration />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppStatistics title="Statistics" list={statsData} />
          </Grid>
        </Grid>
      </Container>
    </DashboardPageProvider>
  );
}

export default function Campaigns() {
  return <CampaignsContent />;
}
