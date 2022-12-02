import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useState} from "react"
import {useSignup} from "../hooks/useSignup"
import AuthForm from "../components/AuthForm";

const RegisterFormFooter = (
  <Grid container justifyContent="flex-end">
    <Grid item>
      <Link to="/login" variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
)

const RegisterCheckbox = (
  <Grid item xs={12}>
    <FormControlLabel
      control={
        <Checkbox value="allowExtraEmails" color="primary" />
      }
      label="I want to receive inspiration, marketing promotions and updates via email."
    />
  </Grid>
)

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const {signup, error, isLoading} = useSignup()
  const list = [
    {
      inputProps:{
        autoComplete:"given-name",
        name:"firstName",
        id:"firstName",
        label:"First Name",
        onChange:(e)=>{setFirstname(e.target.value)},
        value:firstname,
      },
      gridProps:{xs:12, sm:6}
    },
    {
      inputProps:{
        autoComplete:"family-name",
        id:"lastName",
        label:"Last Name",
        name:"lastName",
        onChange:(e)=>{setLastname(e.target.value)},
        value:lastname,
      },
      gridProps:{xs:12, sm:6}
    },
    {
      inputProps:{
        autoComplete:"email",
        id:"email",
        label:"Email Address",
        name:"email",
        fullWidth:true,
        onChange:(e)=>{setEmail(e.target.value)},
        value:email,
      },
      gridProps:{xs:12}
    },
    {
      inputProps: {
        autoComplete:"new-password",
        id:"password",
        label:"Password",
        name:"password",
        type:"password",
        onChange:(e)=>{setPassword(e.target.value)},
        value:password
      },
      gridProps:{xs:12}
    },

  ]

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(firstname, lastname, email, password)
    setEmail("")
    setPassword("")
    setFirstname("")
    setLastname("")
  };

  return (
    <AuthForm title="Sign up" handleSubmit={handleSubmit} isLoading={isLoading} error={error} footer={RegisterFormFooter}>
      <Grid container spacing={2}>
        {list.map((listItem, index)=>{
          return (
            <Grid item key={index} {...listItem.gridProps}>
              <TextField fullWidth required {...listItem.inputProps} autoFocus />
            </Grid>
          )
        })}
        {RegisterCheckbox}
      </Grid>
    </AuthForm>
  );
}
