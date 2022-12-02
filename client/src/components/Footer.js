import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
  <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
    <Typography variant="h6" align="center" gutterBottom>
      B2ST
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Please donate to our Stripe Account
    </Typography>
  </Box>
 )
}