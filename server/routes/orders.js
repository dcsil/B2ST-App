const express = require("express");
const router = express.Router();
const fs = require("fs");
const csv = require("csv-parser");

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
  var readStream = fs.createReadStream(
    "datasets/ecommerce-purchases-electronics.csv"
  );
  readStream
    .on("close", () => {
      return res.send({ data: resData, labels: resLabels });
    })
    .pipe(csv())
    .on("data", (data) => {
      if (resData.length == 100) {
        readStream.destroy();
      } else if(data['price']){
        let dateStr = data["event_time"].split(" ")[0];
        if (resLabels.includes(dateStr)) {
          resData[resLabels.indexOf(dateStr)] += parseFloat(data["price"]);
        } else {
          resLabels.push(dateStr);
          resData.push(parseFloat(data["price"]));
        }
      }
    })
}

module.exports = router;
