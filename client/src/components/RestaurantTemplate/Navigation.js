import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LoginDialog from './Login/LoginDialog';

export default function Navigation(){
    const [open, setOpen] = React.useState(false);
    const [phone, setPhone] = React.useState('');
    const login=(p)=>{
        setPhone(p);
        setOpen(false);
    }

    return(
    <AppBar
      position='fixed'
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Restaurant name
        </Typography>
        <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              About
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Menu
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Contact
            </Link>
          </nav>
          {!phone ?
          <Button
            href="#"
            variant="outlined" sx={{ my: 1, mx: 1.5 }}
            onClick={() => setOpen(true)}
          >
            Login
          </Button>:
          <Button
            href="#"
            variant="outlined" sx={{ my: 1, mx: 1.5 }}
           >
            Profile
           </Button>
          }
        </Toolbar>
        
        <LoginDialog open={open} handleClose={login}/>
    </AppBar>
    );
}