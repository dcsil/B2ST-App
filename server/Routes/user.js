const express = require("express");
const router = express.Router();
const print = console.log
const User = require("../module/User")
// @route POST Route/users

router.post("/",[
    // not defined
    // check("name", "Name is required").not().isEmpty(),
    // check("email", "Please include a valid email").isEmail(),
    // check("password", "Please enter a password with 6 or more characters").isLength({min:6})
], async (req, res)=>{
    const error = validationResult(req);
    print("Now Start")
    if (!error.isEmpty()){
        return res.status(400).json({ error: error.array() });
    }
    else{
        print(req.body)
    }

    const {name, email, password} = req.body
    try{
        let user = await User.findOne({email});
        if (user){
            res.status(400).json({error: [{msg: "User already exists"}]});
            //see if user exists
        }
        user = new User({
            name, email, password
        })
        user.password = password
        await user.save();


    }catch(error){
        print(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router