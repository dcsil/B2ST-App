import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {useHistory} from "react-router-dom";
import { useNavigate } from "react-router";


const theme = createTheme();
const print = console.log




const Register = ()=> {
  const [form, setForm] = useState({

    email: "",
    password: "",
  });
  
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

 
  
  
  
  const onSubmit = async  (event) => {
    event.preventDefault();
    const newPerson = { ...form };
    print(newPerson)



  };



  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/">B2ST</a>
          </Typography>
          <Button variant="contained" color="primary" href="/login">
            Login
          </Button>
          <Button variant="contained" color="primary" href="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs">
        <div>

          {form.email}
          {form.password}
        </div>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value = {form.email}
                  onChange={(e)=>updateForm({email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value = {form.password}
                  onChange={(e)=>updateForm({password: e.target.value})}
                />
              </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
            <Grid container>
              <Grid item xs>
                <Link to="/retrieve" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Register