import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Box} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function DashboardDialog(props) {
    const [loading,setLoading] = React.useState(false);
    const {open,closeDialog,title,children, component,validate,onSubmit,callback} = props;
    const submit = () => {
        setLoading(true);
        onSubmit()
        .then(() => {
            setLoading(false);
            closeDialog();
            callback();
        });
    }

    return (
      <Dialog open={open} onClose={closeDialog} style={{width:'100%'}}>
        <DialogTitle>{title}</DialogTitle>
        <Box sx={{width:500}}>
            <DialogContent>
                {children}
            </DialogContent>
            {component==="form"&&
            <DialogActions>
                <LoadingButton
                    onClick={submit}
                    loading={loading}
                    disabled={!validate}
                >
                    Submit
                </LoadingButton>
            </DialogActions>}
        </Box>
      </Dialog>
    )
}