import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { useAuthContext } from '../../hooks/useAuthContext';
import "../../App.css"
import {Link } from 'react-router-dom';
import {useState, useEffect} from "react"
import axios from "axios";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Badge,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useLogout} from "../../hooks/useLogout"
const print = console.log
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashboardAppBarContent(props) {
    const [open, setOpen] = React.useState(true);
    const [email, setEmail] = useState("")
    const [plan, setPlan] = useState("")
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const {logout} = useLogout();
    const handleLogout = async ()=>{
      logout()
    };

    const {user} = useAuthContext()
    
    useEffect(()=>{
      getPlan()
    }, [])

  const getPlan = async ()=>{
    
    const email = (user.email? user.email: user.user.email)
    // print(user.email)
    setEmail(email)
    const {data: plan} = await axios.post("http://localhost:5000/subs", {email: email})
    
    setPlan(plan)
    // print(plan)
  }
  
    return (
        <>
        
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
                           
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
 
              
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {props.name} 
                <span className='current_plan'>
                  {plan}
                </span>
                {props.backto && (
                  <IconButton
                    component={Link}
                    to={props.backto}
                    aria-label="back"
                  >
                    <ChevronLeftIcon />
                  </IconButton>)}
                  
                  
              </Typography>
              {email}
              
              {/* <button onClick={getPlan}>get plan</button> */}
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} sx={{display:'flex'}}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
            <List component='nav' style={{ marginTop: `auto`}}>
              <ListItem
                disablePadding
              >
   
              <ListItemButton component={Link} to='/profile'>
                <ListItemAvatar>
                  <Avatar/>
                </ListItemAvatar>
                <ListItemText sx={{ pl: 2 }} primary='Profile' />
                <IconButton  onClick={handleLogout}>
                <LogoutIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          </List>
          </Drawer>
      </>
    );
}  

export default function DashboardAppBar(props) {
    return <DashboardAppBarContent name={props.name} backto={props.backto}/>;
}