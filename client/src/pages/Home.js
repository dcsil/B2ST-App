import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import LandingPageProvider from "../components/PageProvider/LandingPageProvider";

export default function Home() {
  React.useEffect(() => {
    document.title = "B2ST | Homepage";
  }, []);
  return (
    <LandingPageProvider containerProps={{maxWidth:"sm"}} boxProps={{mt:8}}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        Welcome to B2ST
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        We are a SMS Marketing B2B company. Our Machine Learning
        algorithms and seamless integratino give us a competitive
        advantage over our competitors.
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        <Link to="/">
          <Button variant="outlined">Developer Team</Button>
        </Link>
      </Stack>
    </LandingPageProvider>
  );
}
