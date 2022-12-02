const express = require("express");
const { AssignedAddOnExtensionInstance } = require("twilio/lib/rest/api/v2010/account/incomingPhoneNumber/assignedAddOn/assignedAddOnExtension");
require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;
const router = express.Router();
const Mes = require("../models/MesModel")
const messaging_sid = process.env.TWILIO_MESSAGING_SERVICE;
const heroku_host = process.env.HEROKU_HOST;

const sendSMS = async (mes, to,sendAt) => {
  try{
    const req = {
      body: mes,
      from: messaging_sid,
      to: to,
      statusCallback: `${heroku_host}/sms`
    };
    if (sendAt) {
      req.sendAt = new Date(sendAt);
      req.scheduleType = "fixed";
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
    const { mes, to,sendAt,user,hasCode } = req.body;
    const codes=[];
    to.map( num => {
      const code = Math.floor(Math.random() * 1000000);
      codes.push(code);
    })
    Promise.all(to.map(async (number,index) => {
      await sendSMS((hasCode?mes + "\n Promotion Code: " + codes[index]:mes), number,sendAt);
    }))
    .then(() => {
      Promise.all(to.map(async (number,index) => {
        let cur_code = hasCode?codes[index]:null;
        await Mes.recordMes(phone,number,user,(hasCode?"one time":"mes"),cur_code,10,mes,sendAt).catch(err => {throw err});
      })).then(() => {
        res.status(200).send("Messages sent");
      }).catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(err.status).send(err);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/getRecords",async (req,res) => {
  try {
    const { user } = req.body;
    const records = await Mes.getMessages(user);
    console.log(records);
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json(error);
  }
});



module.exports = {sendSMS, getSMS,router};