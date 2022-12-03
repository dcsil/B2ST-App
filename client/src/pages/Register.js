import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useState} from "react"
import {useSignup} from "../hooks/useSignup"
import AuthForm from "../components/AuthForm";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import "../../src/App.css"
import { Typography } from "@mui/material";
const validator = require('validator');
const RegisterFormFooter = (
  <Grid container justifyContent="flex-end">
    <Grid item>
      <Link to="/login" variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
)

const inputProps = (name,label,value,onChange,otherProps,gridProps) => {
  return {
    inputProps:{
      name,
      autoComplete:name,
      id:name,
      label,
      value,
      onChange,
      ...otherProps
    },
    gridProps:{...gridProps}
  }
}

const checkList = (email,firstname,lastname,password) => ([
  {name:"Valid email", status:validator.isEmail(email)},
  {name:"All fields must be filled", status:firstname && lastname && email && password},
  {name:"Password length must be greater than 6", status:password.length > 6},
  {name:"Password must contain at least one uppercase letter, one lower case letter and one number", status:password.search(/[A-Z]/) > -1 && password.search(/[0-9]/)  > -1 && password.search(/[a-z]/) > -1}
])

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const {signup, error, isLoading} = useSignup()
  const checkValid = password.length > 6 && password.search(/[A-Z]/) > -1 && password.search(/[0-9]/)  > -1 && password.search(/[A-Z]/) > -1 && firstname && lastname && email && password;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkValid){
      await signup(firstname, lastname, email, password)
      setEmail("")
      setPassword("")
      setFirstname("")
      setLastname("")
    }
  };
  const list = [
    inputProps("firstName", "First Name", firstname, (e)=>{setFirstname(e.target.value)}, {}, {xs:12, sm:6}),
    inputProps("lastName", "Last Name", lastname, (e)=>{setLastname(e.target.value)}, {}, {xs:12, sm:6}),
    inputProps("email", "Email Address", email, (e)=>{setEmail(e.target.value)}, {}, {xs:12}),
    inputProps("password", "Password", password, (e)=>{setPassword(e.target.value)}, {type:"password"}, {xs:12})
  ]
  return (
    <AuthForm title="Sign up" handleSubmit={handleSubmit} isLoading={isLoading} error={error} footer={RegisterFormFooter}>
      <Grid container spacing={2}>
        {list.map((listItem, index)=>(
            <Grid item key={index} {...listItem.gridProps}>
              <TextField fullWidth required {...listItem.inputProps} autoFocus />
            </Grid>
          ))}
        <div className="checkContainer">
          {checkList(email,firstname,lastname,password).map((checkItem, index)=>(
            <Box key={index} color={checkItem.status ? "success" : "error"} sx={{ display: 'flex', alignItems: 'center', mt:1}}>
              <Typography flexGrow={1}>{checkItem.name}</Typography>
              {checkItem.status ? <CheckCircleIcon flex color="success"/>:<CancelIcon color = "error"/>}
            </Box>
          ))}
        </div>
      </Grid>
    </AuthForm>
  );
}

