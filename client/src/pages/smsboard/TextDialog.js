import React from 'react';
import { TextField, FormControlLabel,Switch, FormGroup} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import DashboardDialog from '../../components/DashboardDialog';
const defaultText = "Hi, this is a message from B2ST!";

const TextDialog = (props) => {
    const [text,setText] = React.useState(defaultText);
    const [time, setTime] = React.useState(dayjs());
    const [code, setCode] = React.useState(false);
    const [now, setNow] = React.useState(true);
    const validateTime = () => {
      if (time.isBefore(dayjs().add(20,'minute')) && !now) {
        console.log("Time is before 20 minutes from now");
        return "Please select a time at least 20 minutes from now.";
      }
      if (time.isAfter(dayjs().add(7,'day')) && !now) {
        return "You can't schedule a text for more than 7 days in the future!";
      }
      return "";
    }

    const reset = () => {
      setText(defaultText);
      setTime(dayjs());
      setCode(false);
      setNow(true);
    }

    return(
      <DashboardDialog 
        open={props.open}
        closeDialog={props.closeDialog}
        title="Edit Text"
        component="form"
        validate={text && !validateTime()}
        onSubmit={()=>props.sendText(text, now ? "" : time.toDate(),code)}
        callback={reset}
      >
        <TextField
          color='secondary'
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
              renderInput={(props) => <TextField {...props} error={validateTime()} helperText={validateTime()}/>}
                label="Date & Time"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                minDate={dayjs().add(20,'minute')}
                maxDate={dayjs().add(7,'day')}
            />
          </LocalizationProvider>
        }
        <FormGroup sx={{mb:2}}>
          <FormControlLabel
            control={
              <Switch checked={code} onChange={()=>setCode(!code)} name="code" />
            }
            label="promotion code?"
          />
        </FormGroup>
      </DashboardDialog>
    );
  };

export default TextDialog;