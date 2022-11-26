import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {useLogout} from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export default function LandingAppBar() {

  const {user} = useAuthContext()
  
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography
            href="/"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link to={!user? "/dashboard":"/"}>B2ST</Link>
           
          </Typography>
          <Link to="/">
          </Link>
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
