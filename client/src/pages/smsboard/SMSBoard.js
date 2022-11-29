import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardAppBar from '../dashboard/DashboardAppBar';
import EnhancedTable from './ContactTable';
import TextDialog from './TextDialog';
import { Collapse, Alert,IconButton,Container,Grid,Toolbar,Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SMSTable from './SMSOverview';

const mdTheme = createTheme();
const api_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL;

function SMSBoardContent() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [alert, setAlert] = React.useState({severity:'',message:''});
  const sendText = async (text,time) => {
    const request = new Request(`${api_url}/sms/sendAll`, {
      method: 'post',
      body: JSON.stringify({ mes:text, to:selected, sendAt:time}),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          setAlert({severity:'success',message:'Texts sent successfully!'});
        } else {
          setAlert({severity:'error',message:'Error sending texts!'});
          console.log(res);
        }
      })
      .catch(error => {
        setAlert({severity:'error',message:'Server Error!'});
        console.log(error);
      });
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardAppBar name="SMS"/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} padding={2}>
              <Grid item xs={12}>

                <EnhancedTable sendText={(selected)=>{setSelected(selected);setOpen(true)}}/>
              </Grid>
              <Grid item xs={12}>
                <SMSTable />
              </Grid>
            </Grid>
          </Container>
          <TextDialog
            open={open}
            closeDialog={() => setOpen(false)}
            sendText={(text,time) => sendText(text,time)}
          />
          <Collapse in={alert.severity} sx={{position:"fixed",bottom:0}}>
            <Alert
              severity={alert.severity}
              action={
                <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({severity: '', message: ''});
              }}
            >
              <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alert.message}
            </Alert>
          </Collapse>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function SMSBoard() {
  return <SMSBoardContent />;
}