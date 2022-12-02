import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from "react-router-dom";

const mainLists = [
  {
    link: "/",
    icon: <HomeIcon />,
    text: "Home"
  },
  {
    link: "/dashboard",
    icon: <DashboardIcon />,
    text: "Dashboard"
  },
  // {
  //   link: "/dashboard/orders",
  //   icon: <ShoppingCartIcon />,
  //   text: "Orders"
  // },
  {
    link: "/dashboard/plans",
    icon: <ShoppingCartIcon />,
    text: "Plans"
  },
  {
    link: "/dashboard/customers",
    icon: <PeopleIcon />,
    text: "Customers"
  },
  {
    link: "/dashboard/campaigns",
    icon: <BarChartIcon />,
    text: "Campaigns"
  },
  {
    link: "/dashboard/sms",
    icon: <MessageIcon />,
    text: "SMS"
  },


  // {
  //   link: "/dashboard/integrations",
  //   icon: <LayersIcon />,
  //   text: "Integrations"
  // }
]

const secondLists = [];

export function AppBarListItems(props) {
  const {component,subheader}=props;
  const list = component === "main" ? mainLists : secondLists;
  return (
    <React.Fragment>
    <ListSubheader component="div" inset>
      {subheader}
    </ListSubheader>
    {list.map((item, index) => (
      <ListItemButton component={Link} to={item.link}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
    </React.Fragment>
  )
}