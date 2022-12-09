import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBarListItems } from "./listItems";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Box,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../../hooks/useLogout";
const drawerWidth = 240;

const TRANSITION = (theme, props) =>
  theme.transitions.create(props, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: TRANSITION(theme, ["width", "margin"]),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: TRANSITION(theme, ["width", "margin"]),
  }),
  backgroundColor: "#084C7D",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: TRANSITION(theme, ["width"]),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: TRANSITION(theme, ["width"]),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardAppBarDrawer(props) {
  const { open, toggleDrawer } = props;
  const { logout } = useLogout();
  const handleLogout = async () => { logout();};
  return (
    <Drawer variant="permanent" open={open} sx={{ display: "flex", backgroundColor: "#dde3ea" }}>
      <Toolbar sx={{ display: "flex",alignItems: "center",justifyContent: "flex-end",px: [1],backgroundColor: "#084C7D",color: "white",}}>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, paddingLeft: "10px" }}>B2ST</Typography>
        <IconButton onClick={toggleDrawer}><ChevronLeftIcon /></IconButton>
      </Toolbar>
      <Divider sx={{ backgroundColor: "black" }} />
      <List component="nav" sx={{ backgroundColor: "white", color: "white" }}>
        <AppBarListItems component="main" />
      </List>

      <List
        component="nav"
        style={{
          paddingBottom: "68vh",
          color: "black",
          backgroundColor: "white",
        }}
      >
        <ListItemButton component={Link} to="/">
          <IconButton>
            <KeyboardReturn />
          </IconButton>

          <ListItemText sx={{ pl: 2, color: "black" }} primary="Homepage" />
        </ListItemButton>
        <ListItemButton component={Link} onClick={handleLogout}>
          <IconButton><LogoutIcon /></IconButton>
          <ListItemText sx={{ pl: 2, color: "black" }} primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );}

function DashboardTopBar(props) {
  const { open, toggleDrawer, plan, email, name, backto } = props;
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton edge="start" color="inherit"
          aria-label="open drawer" onClick={toggleDrawer}
          sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {name}
          {backto && (
            <IconButton component={Link} to={backto} aria-label="back"><ChevronLeftIcon /></IconButton>
          )}
        </Typography>
        {plan ? plan + " • " + email : email}
      </Toolbar>
    </AppBar>
  );
}

export default function DashboardAppBar(props) {
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const toggleDrawer = () => {setOpen(!open);};
  const { user } = useAuthContext();
  useEffect(() => {getPlan();}, []);
  const getPlan = async () => {
    const email = user.email ? user.email : user.user.email;
    setEmail(email);
    const { data: plan } = await axios.post("http://localhost:5000/subs", {
      email: email,
    });
    setPlan(plan);
  };
  return (
    <>
      <DashboardTopBar open={open} toggleDrawer={toggleDrawer} plan={plan} email={email} {...props}/>
      <DashboardAppBarDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
