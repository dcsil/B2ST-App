import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

 
  
  
  
  const onSubmit = async  (event) => {
    event.preventDefault();
    const newPerson = { ...form };
    print(newPerson)

    await fetch("http://localhost:5000/record/add",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newPerson),
    }).catch(error => {
      window.alert(error);
      return;
    });
    setForm({ firstName: "", lastName: "", email: "", password: "" });


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
          {form.firstName}
          {form.lastName}
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value = {form.firstName}
                  onChange={(e)=>updateForm({firstName: e.target.value})}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value = {form.lastName}
                  onChange={(e)=>updateForm({lastName: e.target.value})}
                />
              </Grid>
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

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={postData}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Register