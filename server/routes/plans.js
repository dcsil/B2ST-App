const User = require("../models/UserModel")
const express = require("express")
const router = express.Router()
const print = console.log


const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SET);

router.get("/price", async (req, res) =>{
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SEC
    })
      res.json(prices)

})



router.post("/session", async (req, res) =>{
    
    const {email} = req.body
    const number = req.body.plan
    print(email, number)

    const user = await User.findOne({email: email})
    
    
    // return
    var price_url
    if (number === 0){
        price_url = "price_1M9WPdIlyH1Yo9HOLvXZkEYZ"
    }
    else if (number === 1){
        price_url = "price_1M9dP5IlyH1Yo9HOQNfrPceV"
    }
    else{
        price_url = "price_1M9ddbIlyH1Yo9HOCsh0a7hi"
    }
    const session = await stripe.checkout.sessions.create({
        
        mode: "subscription",
        payment_method_types:["card"],
        line_items: [
            {
                price: price_url, // this can be changed to another hashed price
                quantity: 1
            }
        ],
        success_url: "http://localhost:3000/dashboard",
        cancel_url: "http://localhost:3000/dashboard",  //need change later!
        customer: user.customer.id
    }, {
        apiKey: process.env.STRIPE_SEC
    })
    return res.json({user: user, price: session})
})





module.exports = router
