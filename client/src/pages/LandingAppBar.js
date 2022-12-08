import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" underline="none" color="white">B2ST</Link>
        </Typography>
        {user ? (
          <Button
            variant="contained"
            sx={buttonStyle}
            href="dashboard"
          >
              Dashboard
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              sx={buttonStyle}
              href="login"
              on
            >
              Login
            </Button>
            
            <Button
              variant="contained"
              href="register"
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
