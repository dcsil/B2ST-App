const express = require("express");
const app = express();
// const cors = require("cors");
// require("dotenv").config();
// app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());


const connectDB = require("./config/db")
connectDB();
app.use("/user", require("./Routes/user"))
app.get("/", (req, res)=>{
  res.send("Api Running")
})


 
app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`)
});