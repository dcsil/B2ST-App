require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const contactSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    
    phone:{
        type: String,
        required: true,
    },
    belongsTo:{
        type: String,
        required: true
    },
});
contactSchema.statics.addContact = async function(name, phone, user){
    //check if this phone is used by others in the same account
    const exists = await this.findOne ({phone: phone, belongsTo: user})
    if (exists) {
        throw Error('Phone number already exists')
    }
    // check phone validation
    if (!phone || !name){
        throw Error("All fields must be filled")
    }
    const client = require('twilio')(accountSid, authToken);
    await client.lookups.v2.phoneNumbers(phone)
        .fetch()
        .then((phoneNumber) => {
            if (!phoneNumber.valid){
                throw Error("Invalid phone number")
            }
        })
    // create new contact
    const contact = await this.create({name, phone, belongsTo: user})
    return contact
}

contactSchema.statics.deleteContact = async function(phone, user){
    // delete contact
    const contact = await this.findOneAndDelete({phone: phone
        , belongsTo: user})
    if (!contact) {
        throw Error('Contact not found')
    }
    return contact
}

contactSchema.statics.updatePhone = async function(oldPhone, newPhone, user){
    // update contact
    const contact = await this.findOneAndUpdate({phone: oldPhone
        , belongsTo: user}, {phone: newPhone})
    if (!contact) {
        throw Error('Contact not found')
    }
    return contact
}

contactSchema.statics.updateName = async function(phone, newName, user){
    // update contact
    const contact = await this.findOneAndUpdate({phone: phone
        , belongsTo: user}, {name: newName})
    if (!contact) {
        throw Error('Contact not found')
    }
    return contact
}

contactSchema.statics.getContacts = async function(user){
    // get all contacts
    const contacts = await this.find({belongsTo: user})
    return contacts
}

module.exports = Contact = mongoose.model("Contact", contactSchema)