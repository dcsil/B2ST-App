import { handleRequest } from "./requests/communication";

const api_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL;

export const useSendText = (user,setAlert) => {
    const email=(user.email? user.email: user.user.email);
    const sendText = async (text, selected, time, code) => {
        const request = new Request(`${api_url}/sms/sendAll`, {
            method: 'post',
            body: JSON.stringify({ mes:text, to:selected, sendAt:time,user:email, hasCode:code }),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
        handleRequest(request,setAlert,"text");
    }
    return {sendText}
  }