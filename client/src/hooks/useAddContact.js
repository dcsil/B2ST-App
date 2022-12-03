import { handleRequest } from "./requests/communication";

const api_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_HEROKU_HOST : process.env.REACT_APP_API_URL;

export const useAddContact = (user,setAlert) => {
    const email=(user.email? user.email: user.user.email);
    const addContact = async (name,phone) => {
        const request = new Request(`${api_url}/contact/add`, {
          method: 'post',
          body: JSON.stringify({ name:name, phone:phone, user:email }),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        });
        handleRequest(request,setAlert,"contact");
    }
    return {addContact}
}