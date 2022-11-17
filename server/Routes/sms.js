const express = require("express");
require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;
const router = express.Router();

const sendSMS = (mes, to) => {
    client.messages
    .create({
       body: mes,
       from: phone,
       to: to,
       statusCallback: 'https://dashboard.heroku.com/apps/b2st-server/sms'
     })
    .then(message => console.log(message.sid));
}

const getSMS = async (req) => {
  return await client.messages.list(req);
}

router.post("/sms"), (req, res) => {
  // get incoming message
  const twiml = new MessagingResponse();
  // response
  twiml.message('The Robots are coming! Head for the hills!');

  res.type('text/xml').send(twiml.toString());
};



module.exports = {sendSMS, getSMS,router};