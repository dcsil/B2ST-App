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
    return {addContact}
}