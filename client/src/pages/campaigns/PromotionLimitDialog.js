import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Box, TextField,} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const PromotionLimitDialog = (props) => {
    const [loading,setLoading] = React.useState(false);
    const [upperLimit,setUpperLimit] = React.useState(50);
    const [lowerLimit,setLowerLimit] = React.useState(10);

    const handleLimitChange = () => {
        setLoading(true);
        //TODO: send request to server
        setTimeout(() => {
            setLoading(false);
            props.closeDialog();
        }, 2000);
    }

    return(
      <Dialog open={props.open} onClose={()=>{props.closeDialog()}} style={{width:'100%'}}>
        <DialogTitle>Promotion Limit</DialogTitle>
        <Box sx={{width:500}}>
        <DialogContent>
            <TextField
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min:0,
                    max:100
                }}
                value={upperLimit}
                type="number"
                required
                fullWidth
                label='Upper Bound'
                color='secondary'
                error={upperLimit<lowerLimit || upperLimit>100 || upperLimit<0}
                helperText={upperLimit<lowerLimit ? 'Upper bound must be no less than lower bound' :
                    (upperLimit>100 ? 'Upper bound must be less than 100' :
                    (upperLimit<0 ? 'Upper bound must be greater than 0' : ''))}
                onChange={(e)=>{setUpperLimit(e.target.value)}}
                sx={{marginBottom:2}}
            />
            <TextField
                type='number'
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0,
                    max: 100,
                }}
                value={lowerLimit}
                required
                fullWidth
                error={upperLimit<lowerLimit || lowerLimit>100 || lowerLimit<0}
                helperText={upperLimit<lowerLimit ? 'Lower bound must be no greater than upper bound' :
                    (lowerLimit>100 ? 'Lower bound must be less than 100' :
                    (lowerLimit<0 ? 'Lower bound must be greater than 0' : ''))}
                label='Lower Bound'
                color='secondary'
                onChange={(e)=>{setLowerLimit(e.target.value)}}
            />
            
        </DialogContent>
        <DialogActions>
          <LoadingButton
            disabled={upperLimit<lowerLimit || upperLimit>100 || upperLimit<0 || lowerLimit>100 || lowerLimit<0}
            onClick={()=>{handleLimitChange()}}
            loading={loading}
           >
            Submit
           </LoadingButton>
        </DialogActions>
        </Box>
      </Dialog>
    );
  };

export default PromotionLimitDialog;