const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require('validator');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SET);
const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    customer:{
        type: Object
    },
    plan:{
        type: String,
        required: true,
        default: "Free"
    },
    date:{
        type: Date,
        default: Date.now
    }
});


userSchema.statics.signup = async function(firstname, lastname, email, password) {

    //check if this email is used by others.
    const exists = await this.findOne({email: email})
    if (exists) {
      throw Error('Email already in used')
    }

    // check email and password validation
    if (!email || !password){
        throw Error("All fields must be filled")
    }
     if (!validator.isEmail(email)){
        throw Error("Please enter a valid email ")   
    }
     if (password.length < 6 || password.search(/[a-z]/) < 0 || password.search(/[0-9]/) < 0 || password.search(/[A-Z]/) < 0){
        throw Error("Please use a more complex password")
    }
     
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) //hash is the hassed passowrd
    const customer = await stripe.customers.create({email}, {apiKey: process.env.STRIPE_SEC}) // make a stripe customer based on this email
    const user = await this.create({ firstname, lastname, email, password: hash, customer: customer })
    return user
}






userSchema.statics.login = async function(email, password){
    if (!email || !password){
        throw Error("all fields must be filled")
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Invalid Email.')
    }
    
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        throw Error("Incorrect password")
    }
    return user // sucesss
    


}







module.exports = User = mongoose.model("User", userSchema)