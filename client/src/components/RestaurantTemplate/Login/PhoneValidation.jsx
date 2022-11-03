import React from "react";
import { Box,Button,Typography,TextField,Grid,Link } from "@mui/material";

const PhoneInput = ({phone, handleSubmit, goBack, sendText}) => {
  const [value, setValue] = React.useState('');

  return(
    <Box noValidate sx={{ mt: 1, mr:5,ml:5}}>
        <Typography variant="h7" component="h4">
            A varification code has been sent to your phone number: {phone}
        </Typography>
        <TextField
            margin="normal"
            required
            fullWidth
            name="code"
            label="Verification Code"
            type="text"
            id="code"
            onChange={(e)=>setValue(e.target.value)}
            value={value}
        />
        <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2" onClick={sendText}>
                  send again
                </Link>
            </Grid>
            <Grid item>
                <Link href="#" variant="body2" onClick={goBack}>
                  {"Wrong phone? go back"}
                </Link>
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>handleSubmit(value)}
        >
            Submit
        </Button>
    </Box>
  );
};

export default PhoneInput;