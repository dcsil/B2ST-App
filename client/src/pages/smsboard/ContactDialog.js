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
      <DashboardDialog
        open={props.open}
        closeDialog={props.closeDialog}
        title="Add Contact"
        component="form"
        validate={name && phone.match(/^\+1[0-9]{10}$/)}
        onSubmit={()=>props.addContact(name,phone)}
        callback={reset}
      >
        <TextField
            color='secondary'
            id='outlined-multiline-static'
            label='Name'
            value={name}
            required
            error={name===""}
            fullWidth
            onChange={(e)=>{setName(e.target.value)}}
            sx={{mb:2}}
        />
        <TextField
            color='secondary'
            id='outlined-multiline-static'
            label='Phone'
            value={phone}
            required
            fullWidth
            inputProps={{pattern:"\\+1[0-9]{9}"}}
            error={!phone.match(/^\+1([0-9]{10})$/)}
            helperText="Phone number must be in +1XXXXXXXXXX (CA) format"
            onChange={(e)=>{setPhone(e.target.value)}}
            sx={{mb:2}}
        />
      </DashboardDialog>
    );
  };

export default ContactDialog;