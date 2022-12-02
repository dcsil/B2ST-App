import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingAppBar from './LandingAppBar';
import { useAuthContext } from '../hooks/useAuthContext';
import Footer from '../components/Footer';
import axios from 'axios';
import "../App.css"
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
  // Currently, these two plans are not available. Clicking them would be directed to basic plans
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
  }
];

const PlanCard = (props) => {
  const {tier, index, checkout} = props;
  return (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <Card onClick={(e)=>{checkout(e, {index})}} className='payment_card' >
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
  );
}

const Plan = () =>{
    const {user} = useAuthContext()
    const checkout = async (e,index)=>{
      e.preventDefault()
      print(index)
      const email = (user.email? user.email: user.user.email)
      const {data: response} = await axios.post("http://localhost:5000/plans/session", {email: email, plan: index.index})
      print(response)
      window.location.href = response.price.url
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
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier, index) => (
            <PlanCard tier={tier} index={index} checkout={checkout}/>
          ))}
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Plan