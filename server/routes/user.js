const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()

const createToken = (_id)=>{
    return jwt.sign({_id: _id}, "secretCode", {expiresIn: "3d"})
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

router.post("/signup", async (req, res)=>{
    const {firstname, lastname, email, password} = req.body
    try {
        const user = await User.signup(firstname, lastname, email, password)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router
