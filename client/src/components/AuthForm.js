import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LandingPageProvider from "./PageProvider/LandingPageProvider";
import Button from "@mui/material/Button";

export default function AuthForm(props) {
  const {title, children, handleSubmit, isLoading, error, footer} = props;
  return (
    <LandingPageProvider containerProps={{maxWidth:"xs"}} boxProps={{sx:{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center"}}}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {children}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading} >
          {title}
        </Button>
        {error && <div className="error">{error}</div>}
        {footer}
      </Box>
    </LandingPageProvider>
  )
}