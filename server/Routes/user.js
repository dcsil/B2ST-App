const User = require("../models/UserModel")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const print = console.log
// log in 
router.post("/login", (req, res)=>{
    res.status(200).json({msg: "post for log in "})
})

// sign up
router.post("/signup", (req, res)=>{
    res.status(200).json({msg: "post for signup "})
})

module.exports = router