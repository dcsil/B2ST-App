const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const print = console.log


const createToken = (_id)=>{
    // jwt.sign({_id: _id}, "this should be secrete")
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: "3d"})
}

router.post("/login",async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// sign up
router.post("/signup", async (req, res)=>{
    print(req.body)
    const {firstname, lastname, email, password} = req.body
    print(firstname, lastname, email, password)

    try {
        const user = await User.signup(firstname, lastname, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token})

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router