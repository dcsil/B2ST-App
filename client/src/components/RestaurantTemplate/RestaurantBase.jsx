import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Footer from './Footer';
import Navigation from './Navigation';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        B2ST
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function RestaurantBase(props) {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Navigation/>
      <Box disableGutters sx={{m:0,width:'100%',maxWidth:'100%'}}>
        {props.children}
      </Box>
      <Footer>
        <Copyright sx={{ mt: 5 }} />
      </Footer>
    </React.Fragment>
  );
}