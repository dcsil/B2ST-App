import * as React from 'react';
import { Dashboard, ShoppingCart, Message } from '@mui/icons-material';
import { ListItemIcon, ListItemText, ListSubheader, ListItemButton, Divider } from '@mui/material';
import { Link } from "react-router-dom";

const mainLists = [
  {
    link: "/dashboard",
    icon: <Dashboard />,
    text: "Dashboard"
  },
  {
    link: "/dashboard/campaign",
    icon: <Message />,
    text: "Campaign"
  },
  {
    link: "/dashboard/plans",
    icon: <ShoppingCart />,
    text: "Plans"
  }
]

export function AppBarListItems(props) {
  const {component,subheader}=props;
  const list = component === "main" ? mainLists : [];
  return (
    <React.Fragment>
    <ListSubheader component="div" inset>
      {subheader}
    </ListSubheader>
    {list.map((item, index) => (
      <ListItemButton component={Link} to={item.link} key={index} sx={{color: "black", pl:3}}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text}/>
      </ListItemButton>
    ))}
    <Divider sx={{color: "black", pt: 3}}/>
    </React.Fragment>
  )
}