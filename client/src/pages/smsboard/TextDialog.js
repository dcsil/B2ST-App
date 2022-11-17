import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Box, TextField, FormControlLabel,Switch, FormGroup} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
const defaultText = "Hi, this is a message from B2ST!";

const TextDialog = (props) => {
    const [text,setText] = React.useState(defaultText);
    const [loading,setLoading] = React.useState(false);
    const [time, setTime] = React.useState(dayjs());
    const [now, setNow] = React.useState(true);
    const sendText = () => {
        if (time.isBefore(dayjs().add(20,'minute')) && !now) {
            alert("You can't schedule a text for less than 20 minutes from now!");
            return;
        }
        if (time.isAfter(dayjs().add(7,'day')) && !now) {
            alert("You can't schedule a text for more than 7 days in the future!");
            return;
        }
        setLoading(true);
        const scheduletime= now ? "" : time.toDate();
        props.sendText(text, scheduletime)
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
                sx={{mb:2}}
            />
            <FormGroup sx={{mb:2}}>
                <FormControlLabel
                   control={
                    <Switch checked={!now} onChange={()=>setNow(!now)} name="now" />
                  }
                  label="schedule a text?"
                />
            </FormGroup>
            { !now &&
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date & Time"
                    value={time}
                    onChange={(newValue) => {
                        setTime(newValue);
                    }}
                    minTime={dayjs()}
                    maxTime={dayjs().add(200,'day')}
                />
            </LocalizationProvider>
            }
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