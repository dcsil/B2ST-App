import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function LandingAppBar() {
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography
            href="/"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <a href="/">B2ST</a>
          </Typography>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
        </Toolbar>
    </AppBar>
  );
}
