require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const sendSMS = (mes, to) => {
    client.messages
    .create({
       body: mes,
       from: phone,
       to: to,
     })
    .then(message => console.log(message.sid));
}

module.exports = sendSMS;