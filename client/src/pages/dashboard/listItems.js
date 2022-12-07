import * as React from 'react';
import { Home, Dashboard, ShoppingCart, People, BarChart, Message } from '@mui/icons-material';
import { ListItemIcon, ListItemText, ListSubheader, ListItemButton } from '@mui/material';
import { Link } from "react-router-dom";

const mainLists = [
  {
    link: "/",
    icon: <Home />,
    text: "Home"
  },
  {
    link: "/dashboard",
    icon: <Dashboard />,
    text: "Dashboard"
  },
  {
    link: "/dashboard/plans",
    icon: <ShoppingCart />,
    text: "Plans"
  },
  {
    link: "/dashboard/customers",
    icon: <People />,
    text: "Customers"
  },
  {
    link: "/dashboard/revenue",
    icon: <BarChart />,
    text: "Revenue"
  },
  {
    link: "/dashboard/campaign",
    icon: <Message />,
    text: "Campaign"
  }
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
      <ListItemButton component={Link} to={item.link} key={index}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    ))}
    </React.Fragment>
  )
}