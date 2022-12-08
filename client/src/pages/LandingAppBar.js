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
  mr: 2,
  "&:hover": {
    backgroundColor: "#DDE3EA",
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:'white' }}>
          <Link to='/' style={{color:'white', textDecoration:'none'}}>B2ST</Link>
        </Typography>
        {user ? (
          <Button
            variant="contained"
            sx={buttonStyle}
            component={Link}
            to="/dashboard"
          >
              Dashboard
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              sx={buttonStyle}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            
            <Button
              variant="contained"
              component={Link}
              to="/register"
              sx={buttonStyle}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
