require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mesSchema = new Schema({
    from:{
        type: String,
        required: true
    },
    
    to:{
        type: String,
        required: true,
    },

    belongsTo:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    code:{
        type: String
    },
    amount:{
        type: Number
    },
    sentDate:{
        type: Date,
        required: true
    },
    expireDate:{
        type: Date
    },
    mes:{
        type: String
    },
    active:{
        type: Boolean
    }
});
mesSchema.statics.recordMes = async function(from, to, user, type, code, amount,mes,sendAt){
    if (!to || !from || !user || !type){
        throw Error("Missing required fields")
    }
    const time=sendAt? sendAt: new Date();
    const expire=new Date(time);
    expire.setMonth(expire.getMonth()+2);
    // create new mes record
    const record = await this.create({
        from:from,
        to:to,
        belongsTo: user,
        type:type,
        code:code,
        amount:code?amount:null,
        mes:mes,
        sentDate: time,
        expireDate: code? expire : null,
        active: code? false:null
    })
    return record
}

mesSchema.statics.updateMes = async function(id, active){
    // update mes
    const record = await this.findOneAndUpdate
    ({_id:
        id
    }, {active})
    if (!mes) {
        throw Error('Mes not found')
    }
    return record
}

mesSchema.statics.getMessages = async function(user){
    // get all contacts
    const record = await this.find({belongsTo: user})
    return record
}

module.exports = Mes = mongoose.model("Mes", mesSchema)