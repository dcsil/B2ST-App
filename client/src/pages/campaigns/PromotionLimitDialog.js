import React from 'react';
import { TextField,} from '@mui/material';
import DashboardDialog from '../../components/DashboardDialog';

const PromotionLimitDialog = (props) => {
    const [upperLimit,setUpperLimit] = React.useState(50);
    const [lowerLimit,setLowerLimit] = React.useState(10);

    const handleLimitChange = () => {
        //TODO: send request to server
    }

    const validateUpperLimit = () => {
        return upperLimit<lowerLimit ? 'Upper bound must be no less than lower bound' :
            (upperLimit>100 ? 'Upper bound must be less than 100' :
            (upperLimit<0 ? 'Upper bound must be greater than 0' : ''))
    }

    const validateLowerLimit = () => {
        return lowerLimit>upperLimit ? 'Lower bound must be no greater than upper bound' :
            (lowerLimit>100 ? 'Lower bound must be less than 100' :
            (lowerLimit<0 ? 'Lower bound must be greater than 0' : ''))
    }

    return(
      <DashboardDialog
        open={props.open}
        closeDialog={props.closeDialog}
        title="Set Promotion Limit"
        component="form"
        validate={!validateUpperLimit() && !validateLowerLimit()}
        onSubmit={handleLimitChange}
        callback={()=>{}}
      >
        <TextField
            inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
            }}
            value={upperLimit}
            type="number"
            required
            fullWidth
            label='Upper Bound'
            color='secondary'
            error={validateUpperLimit()}
            helperText={validateUpperLimit()}
            sx={{marginBottom:2}}
            onChange={(e)=>{setUpperLimit(e.target.value)}}
        />
        <TextField
            type='number'
            inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
            }}
            value={lowerLimit}
            required
            fullWidth
            error={validateLowerLimit()}
            helperText={validateLowerLimit()}
            label='Lower Bound'
            color='secondary'
            onChange={(e)=>{setLowerLimit(e.target.value)}}
        />
      </DashboardDialog>
    );
  };

export default PromotionLimitDialog;