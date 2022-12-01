const express = require("express");
require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Contact = require("../models/ContactModel")

const router = express.Router();

router.post("/getAll", async (req, res) => {
    try {
        const { user } = req.query;
        const contacts = await Contact.getContacts(user);
        res.status(200).send(contacts);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/add", async (req, res) => {
    try {
        const { name, phone, user } = req.body;
        const contact = await Contact.addContact(name, phone, user);
        res.status(200).send(contact);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete("/", async (req, res) => {
    try {
        const { id } = req.body;
        const contact = await Contact.deleteContact(id);
        res.status(200).send(contact);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;