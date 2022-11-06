const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const print = console.log

const connectDB = async() =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true
        });
        print("MongoDB connected");

    }catch(error){
        print(error.message);
        process.exit(1);
    }
}

module.exports = connectDB