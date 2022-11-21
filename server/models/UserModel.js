const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
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
    date:{
        type: Date,
        default: Date.now
    }
});


userSchema.statics.signup = async function(email, password) {

    //check if this email is used by others.
    const exists = await this.findOne({ email })
    if (exists) {
      throw Error('Email already in use')
    }

    // check email and password validation
    if (!email || !password){
        throw Error("all fields must be filled")
    }
    // if (!validator.isEmail(email)){
    //     throw Error("Email is not valid")   
    // }
    // if (!validator.isStrongPassword(password)){
    //     throw Error("password not strong enough")
    // }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) //hash is the hassed passowrd
    const user = await this.create({ email, password: hash })
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