const mongoose = require("mongoose");
require("dotenv").config({path: "./.env"});
const print = console.log

const db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

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