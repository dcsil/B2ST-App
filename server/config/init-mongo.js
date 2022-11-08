const User = require("../module/User");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "../.env" });
var db;
MongoClient.connect(
  process.env.URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      return console.log(err);
    }

    // Specify the database you want to access
    
    db = client;
    console.log(`MongoDB Connected: ${url}`);
  }
);

module.exports = db;
