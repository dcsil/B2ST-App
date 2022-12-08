import LandingPageProvider from "../components/PageProvider/LandingPageProvider";
import { Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
export default function Error404() {
    React.useEffect(() => {
      document.title = "B2ST | Error 404";
    }, []);
  return (
    <LandingPageProvider containerProps={{ maxWidth: "sm" }} boxProps={{ mt: 8 }}>
      <Typography component="h1" variant="h2" align="center"
        color="text.primary" gutterBottom
      >
        404 Error
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Button variant="outlined" component={Link} to="/">Home</Button>
      </Stack>
    </LandingPageProvider>
  );
}
