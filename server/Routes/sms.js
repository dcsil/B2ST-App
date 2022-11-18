const express = require("express");
require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;
const router = express.Router();

const sendSMS = async (mes, to,sendAt) => {
  const req= {
    body: mes,
    from: phone,
    to: to,
    statusCallback: 'https://dashboard.heroku.com/apps/b2st-server/sms'
  }
  if (sendAt){
    req={
      body: mes,
      from: phone,
      to: to,
      sendAt: sendAt,
      statusCallback: 'https://dashboard.heroku.com/apps/b2st-server/sms'
    }
  }
    await client.messages
    .create(req)
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
}

const getSMS = async (req) => {
  return await client.messages.list(req);
}

router.post("/", (req, res) => {
  // get incoming message
  const twiml = new MessagingResponse();
  // response
  twiml.message('The Robots are coming! Head for the hills!');

  res.type('text/xml').send(twiml.toString());
});

router.post("/sendAll", async (req, res) => {
  console.log(req.body);
  try {
    const { mes, to,sendAt } = req.body;
    const list = await to.forEach((num) => {
      sendSMS(mes, num,sendAt);
    })
    res.send(list);
  } catch (error) {
    res.sendStatus(500);
  }
});



module.exports = {sendSMS, getSMS,router};