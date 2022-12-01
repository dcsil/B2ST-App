const User = require("../models/UserModel")
const express = require("express")
const router = express.Router()
const print = console.log

const Stripe = require('stripe');
// const { useAuthContext } = require("../../client/src/hooks/useAuthContext");
const stripe = Stripe(process.env.STRIPE_SEC);

// const {user} = useAuthContext()


router.post("/", async (req, res)=>{
    const{email: email} = req.body
    print(req.body)
    const user = await User.findOne({email: email})
    if(!user){
        print("no such user found")
    }
    const customerId = user.customer.id
    
    const subscription = await stripe.subscriptions.list(
        {
            customer: customerId,
            status: "all",
            expand: ["data.default_payment_method"]
        },
        {
            apiKey: process.env.STRIPE_SEC
        }
    )
    var plan
    if (!subscription.data.length){
        plan = []
    }
    else{
        plan = subscription.data[0].plan.nickname
    }
    res.json(plan)
    

})





module.exports = router
