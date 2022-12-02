import * as React from 'react';
import EnhancedTable from './ContactTable';
import TextDialog from './TextDialog';
import { Container,Grid } from '@mui/material';
import SMSTable from './SMSOverview';
import { useAuthContext } from '../../hooks/useAuthContext';
import ContactDialog from './ContactDialog';
import DashboardPageProvider from '../../components/DashboardPageProvider';
const api_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL;

function SMSBoardContent() {
  const [open, setOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [alert, setAlert] = React.useState({severity:'',message:''});
  const {user} = useAuthContext();
  const sendText = async (text,time,code) => {
    const email=(user.email? user.email: user.user.email);
    const request = new Request(`${api_url}/sms/sendAll`, {
      method: 'post',
      body: JSON.stringify({ mes:text, to:selected, sendAt:time,user:email, hasCode:code }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          setAlert({severity:'success',message:'Texts sent successfully!'});
        } else {
          setAlert({severity:'error',message:'Error sending texts!'});
          console.log(res);
        }
      })
      .catch(error => {
        setAlert({severity:'error',message:'Server Error!'});
        console.log(error);
      });
  }
  const addContact = async (name,phone) => {
    const email=(user.email? user.email: user.user.email);
    const request = new Request(`${api_url}/contact/add`, {
      method: 'post',
      body: JSON.stringify({ name:name, phone:phone, user:email }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          setAlert({severity:'success',message:'Contact added successfully!'});
        } else {
          setAlert({severity:'error',message:'Error adding contact!'});
          console.log(res);
        }
      })
      .catch(error => {
        setAlert({severity:'error',message:'Server Error!'});
        console.log(error);
      });
  }

  return (
    <DashboardPageProvider name="SMS Board" alert={alert} setAlert={setAlert}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={12}>
            <EnhancedTable 
              sendText={(selected)=>{setSelected(selected);setOpen(true)}}
              addContact={()=>{setContactOpen(true)}}
            />
          </Grid>
          <Grid item xs={12}>
            <SMSTable />
          </Grid>
        </Grid>
      </Container>
      <TextDialog
        open={open}
        closeDialog={() => setOpen(false)}
        sendText={(text,time,code) => sendText(text,time,code)}
      />
      <ContactDialog
        open={contactOpen}
        closeDialog={() => setContactOpen(false)}
        addContact={(name,phone)=>addContact(name,phone)}
      />
    </DashboardPageProvider>
  );
}

export default function SMSBoard() {
  return <SMSBoardContent />;
}