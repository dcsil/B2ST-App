import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Box, TextField, FormControlLabel,Switch, FormGroup} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const ContactDialog = (props) => {
    const [loading,setLoading] = React.useState(false);
    const [name,setName] = React.useState("");
    const [phone,setPhone] = React.useState("+11111111111");
    const addContact = () => {
        setLoading(true);
        props.addContact(name, phone)
        .then(() => {
            setLoading(false);
            props.closeDialog();
            setName("");
            setPhone("+11111111111");
        });
    }

    const validateInput = () => {
        if (name==="") {
            return false;
        }
        if (!phone.match(/^\+1([0-9]{10})$/)) {
            return false;
        }
        return true;
    }

    return(
      <Dialog open={props.open} onClose={()=>{props.closeDialog()}} style={{width:'100%'}}>
        <DialogTitle>Add Contact</DialogTitle>
        <Box sx={{minWidth:500}}>
        <DialogContent>
            <TextField
                color='secondary'
                id='outlined-multiline-static'
                label='Name'
                value={name}
                required
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
                rows={8}
                onChange={(e)=>{setPhone(e.target.value)}}
                sx={{mb:2}}
            />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={()=>{addContact()}}
            loading={loading}
            disabled={!validateInput()}
           >
            Submit
           </LoadingButton>
        </DialogActions>
        </Box>
      </Dialog>
    );
  };

export default ContactDialog;