const express = require("express");
const router = express.Router();
const fs = require("fs");
const csv = require('csv-parser')

router.get("/", async (req, res) => {
  try {
    await getOrders(req, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
function getOrders(req, res) {
  let resData = [];
  let resLabels = [];
  fs.createReadStream('datasets/ecommerce-purchases-electronics.csv')
  .pipe(csv())
  .on('data', (data) => {
    if(data['price']){
        resData.push(data['price'])
        resLabels.push(data['event_time'])
    }
  })
  .on('end', () => {
    res.json({data: resData, labels: resLabels});
  });
}

module.exports = router;
