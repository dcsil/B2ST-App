import React from 'react';
import { TextField} from '@mui/material';
import DashboardDialog from '../../components/DashboardDialog';

const ContactDialog = (props) => {
    const [name,setName] = React.useState("");
    const [phone,setPhone] = React.useState("+11111111111");
    const reset = () => {
        setName("");
        setPhone("+11111111111");
    }
    return(
      <DashboardDialog title="Add Contact" component="form" open={props.open} closeDialog={props.closeDialog}
        validate={name && phone.match(/^\+1[0-9]{10}$/)}
        onSubmit={()=>props.addContact(name,phone)}
        callback={reset}
      >
        <TextField color='secondary' sx={{mb:2}} required label='Name' fullWidth value={name}
          onChange={(e)=>{setName(e.target.value)}}
          error={name===""}/>
        <TextField sx={{mb:2}} required label='Phone Number' fullWidth color='secondary'
            value={phone}
            inputProps={{pattern:"\\+1[0-9]{9}"}}
            error={!phone.match(/^\+1([0-9]{10})$/)}
            helperText="Phone number must be in +1XXXXXXXXXX (CA) format"
            onChange={(e)=>{setPhone(e.target.value)}}
        />
      </DashboardDialog>
    )
  };

export default ContactDialog;