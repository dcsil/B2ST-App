import * as React from "react";
import { TextField, Typography, Button } from "@mui/material";
import Title from "./Title";

export default function Orders() {
  const [user, setUser] = React.useState({
    name: "George",
    email: "george@gmail.com",
    phone: "1234567890",
    address: "1234 Main St",
    city: "San Francisco",
    state: "CA",
  });
  const updateUser = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };
  return (
    <React.Fragment>
      <Title>Welcome {user.name}</Title>
      <Typography variant="h6" component="h6">
        Email
      </Typography>
      <TextField
        id="outlined-basic"
        value={user.email}
        variant="outlined"
        size="small"
        onChange={(e) => updateUser(e, "email")}
      />
      <Typography variant="h6" component="h6">
        Phone
      </Typography>
      <TextField
        id="outlined-basic"
        value={user.phone}
        variant="outlined"
        size="small"
        onChange={(e) => updateUser(e, "phone")}
      />
      <Typography variant="h6" component="h6">
        Address
      </Typography>
      <TextField
        id="outlined-basic"
        value={user.address}
        variant="outlined"
        size="small"
        onChange={(e) => updateUser(e, "address")}
      />
      <Typography variant="h6" component="h6">
        City
      </Typography>
      <TextField
        id="outlined-basic"
        value={user.city}
        variant="outlined"
        size="small"
        onChange={(e) => updateUser(e, "city")}
      />
      <Typography variant="h6" component="h6">
        State
      </Typography>
      <TextField
        id="outlined-basic"
        value={user.state}
        variant="outlined"
        size="small"
        onChange={(e) => updateUser(e, "state")}
      />
      <Button variant="contained" sx={{ mt: 2 }}>
        Update
      </Button>
    </React.Fragment>
  );
}
