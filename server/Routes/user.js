const express = require("express");
const router = express.Router();
const print = console.log
const User = require("../module/User")

router.post("./register", async(req, res) =>{
    const {firstName, lastName, email, password } = req.body
    if (! (firstName && lastName && email && password) ){
        return res.status(400).json({
            error: "Please fill all the fields properly"
        })
    }
    try {
        cosnt 
        
    } catch (error) {
        
    }
})



// router.post("/", async (req, res)=>{
//     const { email, password } = req.body;
//     try{
//         let user = await User.findOne({email});
//         if(user){
//             return res.status(400).json({msg: "User already exists"});
//         }
//         user = new User({
//             email,
//             password
//         });
//         await user.save();
//         res.send("User saved");
//     }catch(err){
//         print(err.message);
//         res.status(500).send("Error in Saving");
//     }
// }
// );

// router.get("/", async (req, res)=>{
//     try{
//         const users = await User.find();
//         res.json(users);
//     }catch(err){
//         print(err.message);
//         res.status(500).send("Error in Getting users");
//     }
// }
// );

// module.exports = router;