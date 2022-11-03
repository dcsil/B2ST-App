import React from "react";
import { Dialog,Typography,Box,TextField,Button } from "@mui/material";
import PhoneInput from "./PhoneInput";
import PhoneValidation from "./PhoneValidation";

const LoginDialog = ({ open, handleClose}) => {
  const [mode, setMode] = React.useState(1);
  const [phone, setPhone] = React.useState('');

  const sendText = (phone) => {
    setPhone(phone);
    setMode(!mode);
  }

  const validateCode = (code) => {
    setMode(1);
    handleClose(phone);
  }

  return(
    <Dialog open={open} onClose={()=>handleClose('')} sx={{margin:'auto'}}>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {mode ? <PhoneInput handleSubmit={sendText}/>
            : <PhoneValidation phone={phone} handleSubmit={validateCode} goBack={()=>setMode(1)} senText={()=>sendText(phone)}/>}
          
        </Box>
    </Dialog>
  );
};

export default LoginDialog;