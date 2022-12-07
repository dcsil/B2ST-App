require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const mongoDbUrl = process.env.NODE_ENV === "test" ? process.env.MONGO_TEST_URL : process.env.MONGO_URL;
let mongodb;

function connect(callback) {

  mongoose.connect(mongoDbUrl, (err, db) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Connected to MongoDB");
    mongodb = db;
    callback();
  });
}
function get() {
  return mongodb;
}

function drop(){
  mongodb.dropDatabase();
}



function close() {
  mongodb.close();
}

module.exports = {
  connect,
  get,
  close,
  drop
};
