require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
// const mongoDbUrl = process.env.MONGO_URL;
const mongoDbUrl = "mongodb+srv://FrankQiao:Qiao123456@cluster0.ocndnae.mongodb.net/?retryWrites=true&w=majority"
let mongodb;

function connect(callback) {
  mongoose.connect(mongoDbUrl, (err, db) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Connected to MongoDB!");
    mongodb = db;
    callback();
  });
}
function get() {
  return mongodb;
}

function close() {
  mongodb.close();
}

module.exports = {
  connect,
  get,
  close,
};
