import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const buttonStyle = {
  backgroundColor: "#ACB9CC",
  color: "black",
  "&:hover": {
    //you want this to be the same as the backgroundColor above
    backgroundColor: "#ACB9CC"
  },
  "a:link": {
    textDecoration: "none"
  }
}
export default function LandingAppBar() {
  const { user } = useAuthContext();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#084C7D" }}>
      <Toolbar>
        <Typography href="/" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={"/"}>B2ST</Link>
        </Typography>
        {user ? (
          <Link to="/dashboard">
            <Button
              variant="contained"
              sx={buttonStyle}
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="contained"
                sx={buttonStyle}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="contained"
                sx={buttonStyle}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
