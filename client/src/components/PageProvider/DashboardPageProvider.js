import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Collapse, Alert,IconButton,Toolbar,Box } from '@mui/material';
import DashboardAppBar from '../../pages/dashboard/DashboardAppBar';
import CloseIcon from '@mui/icons-material/Close';

const DashboardAlert = (props) => {
  const {alert, setAlert} = props;
  return (
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
)}

const mdTheme = createTheme();
export default function DashboardPageProvider(props) {
  const { name, backto, children, alert, setAlert } = props;
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardAppBar name={name} backto={backto} />
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
          {children}
          {alert && <DashboardAlert alert={alert} setAlert={setAlert} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}