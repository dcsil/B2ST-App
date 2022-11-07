const mongoose = require("mongoose");
require("dotenv").config({path: "./.env"});
const print = console.log

const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

const connectDB = async() =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true
        });
        print("MongoDB connected");

    }catch(error){
        print(error.message);
        process.exit(1);
    }
}

module.exports = connectDB