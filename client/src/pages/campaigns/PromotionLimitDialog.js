import React from 'react';
import { TextField,} from '@mui/material';
import DashboardDialog from '../../components/DashboardDialog';

const validateUpperLimit = (upper,lower) => {
  return (upper<lower || upper>100 || upper<0) ?
          'Upper bound must be no less than lower bound, and between 0 and 100' : '';
}

const validateLowerLimit = (upper,lower) => {
  return (lower>upper || lower>100 || lower<0) ?
          'Lower bound must be no greater than upper bound, and between 0 and 100' : '';
}

const PromotionLimitDialog = (props) => {
    const [upperLimit,setUpperLimit] = React.useState(50);
    const [lowerLimit,setLowerLimit] = React.useState(10);
    const handleLimitChange = async () => {}
    return(
      <DashboardDialog open={props.open} closeDialog={props.closeDialog} title="Set Promotion Limit" component="form"
        validate={!validateUpperLimit(upperLimit,lowerLimit) && !validateLowerLimit(upperLimit,lowerLimit)}
        onSubmit={()=>handleLimitChange()}
        callback={()=>{}}
      >
        <TextField required type="number" fullWidth color='secondary' value={upperLimit} label='Upper Bound' sx={{marginBottom:2}} inputProps={{ inputMode: 'numeric',pattern: '[0-9]*'}}
          error={validateUpperLimit(upperLimit,lowerLimit)}
          helperText={validateUpperLimit(upperLimit,lowerLimit)}
          onChange={(e)=>{setUpperLimit(e.target.value)}}
        />
        <TextField required type="number" fullWidth color='secondary' label='Lower Bound' value={lowerLimit} inputProps={{inputMode: 'numeric',pattern: '[0-9]*'}}
          error={validateLowerLimit(upperLimit,lowerLimit)}
          helperText={validateLowerLimit(upperLimit,lowerLimit)}
          onChange={(e)=>{setLowerLimit(e.target.value)}}
        />
      </DashboardDialog>
    );
  };

export default PromotionLimitDialog;