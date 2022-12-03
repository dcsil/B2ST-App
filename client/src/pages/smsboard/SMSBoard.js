import * as React from 'react';
import EnhancedTable from './ContactTable';
import TextDialog from './TextDialog';
import { Container,Grid } from '@mui/material';
import SMSTable from './SMSOverview';
import { useAuthContext } from '../../hooks/useAuthContext';
import ContactDialog from './ContactDialog';
import DashboardPageProvider from '../../components/PageProvider/DashboardPageProvider';
import { useSendText } from '../../hooks/useSendText';
import { useAddContact } from '../../hooks/useAddContact';

export default function SMSBoard() {
  const [open, setOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [alert, setAlert] = React.useState({severity:'',message:''});
  const {user} = useAuthContext();
  const {sendText} = useSendText(user,setAlert);
  const {addContact} = useAddContact(user,setAlert);
  return (
    <DashboardPageProvider name="SMS Board" alert={alert} setAlert={setAlert}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={12}>
            <EnhancedTable sendText={(selected)=>{setSelected(selected);setOpen(true)}} addContact={()=>{setContactOpen(true)}}/>
          </Grid>
          <Grid item xs={12}>
            <SMSTable />
          </Grid>
        </Grid>
      </Container>
      <TextDialog open={open} closeDialog={() => setOpen(false)} sendText={(text,time,code) => sendText(text,selected,time,code)} />
      <ContactDialog open={contactOpen} closeDialog={() => setContactOpen(false)} addContact={(name,phone)=>addContact(name,phone)} />
    </DashboardPageProvider>
  );
}