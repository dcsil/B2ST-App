import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import LandingAppBar from './LandingAppBar';
import {useState} from "react"

const theme = createTheme();
const print = console.log
const tiers = [
  {
    title: 'Basic',
    price: '59.99',
    description: [
    '2000 texts per month',
      '2 GB of storage',
      'Email support',
      'Free installation',
    ],
  },
  {
    title: 'Standard',
    subheader: 'Most popular',
    price: '179.99',
    description: [
        '7000 texts per month',
        '5 GB of storage',
        'Email support',
        'Free installation',
    ],
  },
  {
    title: 'Premium',
    price: '299.99',
    description: [
        '15000 texts per month',
        '10 GB of storage',
        'Email support',
        'Free installation',
    ],
  },

  
];

const Plan = () =>{
    const [state, setState] = useState(0)
    const helper = ()=>{
        print(3)
    }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingAppBar />
      <Container disableGutters maxWidth="sm" component="main" align="center" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Plans
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Subscribe to our website to use our service!
        </Typography>
        {/* <Button sx={{margin:1}} variant="outlined">
            Start free trial for 14 days
        </Button> */}
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card onClick={()=>{helper()}}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
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
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Plan