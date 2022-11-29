const User = require("../models/UserModel")
const express = require("express")
const router = express.Router()
const print = console.log


const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SET);

router.get("/", async (req, res) =>{
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SEC
    })

    
      res.json(prices)

})








module.exports = router
