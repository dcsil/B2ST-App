require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;

const sendSMS = (mes, to) => {
    client.messages
    .create({
       body: mes,
       from: phone,
       to: to,
     })
    .then(message => console.log(message.sid));
}

const getSMS = async (datesent,limit) => {
  return await client.messages.list({
        dateSent: datesent,
        limit:limit
    });
}

module.exports = {sendSMS, getSMS};