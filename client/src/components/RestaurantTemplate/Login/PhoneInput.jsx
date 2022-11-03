import React from "react";
import { Box,Button } from "@mui/material";
import {MuiTelInput} from 'mui-tel-input';

const PhoneInput = ({ handleSubmit}) => {
  const [value, setValue] = React.useState('+33123456789')

  return(
    <Box
        component="form"
        onSubmit={()=>handleSubmit(value)}
        noValidate
        sx={{ mt: 1, mr:5,ml:5}}
    >
        <MuiTelInput
            value={value}
            onChange={(value)=>setValue(value)}
            defaultCountry={'fr'}
            fullWidth
            label="Phone Number"
            margin="normal"
            required
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Continue
        </Button>
    </Box>
  );
};

export default PhoneInput;