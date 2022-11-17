import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Box, TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const defaultText = "Hi, this is a message from B2ST!";

const TextDialog = (props) => {
    const [text,setText] = React.useState(defaultText);
    const [loading,setLoading] = React.useState(false);
    const sendText = () => {
        setLoading(true);
        props.sendText(text)
        .then(() => {
            setLoading(false);
            props.closeDialog();
            setText(defaultText);
        });
    }
    return(
      <Dialog open={props.open} onClose={()=>{props.closeDialog()}} style={{width:'100%'}}>
        <DialogTitle>Edit Text</DialogTitle>
        <Box sx={{minWidth:500}}>
        <DialogContent>
            <TextField
                color='secondary'
                id='outlined-multiline-static'
                label='Content'
                multiline
                value={text}
                required
                fullWidth
                rows={8}
                onChange={(e)=>{setText(e.target.value)}}
            />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={()=>{sendText()}}
            loading={loading}
           >
            Submit
           </LoadingButton>
        </DialogActions>
        </Box>
      </Dialog>
    );
  };

export default TextDialog;