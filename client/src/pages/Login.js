import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingAppBar from "./LandingAppBar";
import {useState} from "react"
import {useLogin} from "../hooks/useLogin"
import {Link} from 'react-router-dom'
import AuthForm from "../components/AuthForm";
const theme = createTheme();
const print = console.log

const LoginFormFooter = (
  <Grid container>
    <Grid item xs>
      <Link to="/" variant="body2">
        Forgot password?
      </Link>
    </Grid>
    <Grid item>
      <Link to="/register" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
)

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login, error, isLoading} = useLogin()
  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password)
  };

  return (
    <AuthForm title="Sign in" handleSubmit={handleSubmit} error={error} isLoading={isLoading} footer={LoginFormFooter}>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
    </AuthForm>
  );
}
