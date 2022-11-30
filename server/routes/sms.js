const express = require("express");
require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;
const router = express.Router();

const sendSMS = async (mes, to,sendAt) => {
  try{
    const req = {
      body: mes,
      from: phone,
      to: to,
      statusCallback: 'https://dashboard.heroku.com/apps/b2st-server/sms'
    };
    if (sendAt) {
      req.sendAt = sendAt;
    }
    await client.messages
    .create(req)
    .then(message => {return message})
    .catch(err => {throw err});
  } catch (err) {
    throw err;
  }
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
  try {
    const { mes, to,sendAt } = req.body;
    Promise.all(to.map(async (number) => {
      await sendSMS(mes, number,sendAt);
    }))
    .then(() => {
      res.status(200).send("Messages sent");
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
  } catch (error) {
    res.sendStatus(500);
  }
});



module.exports = {sendSMS, getSMS,router};