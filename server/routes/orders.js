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
  let result = [];
  var readStream = fs.createReadStream(
    "datasets/ecommerce-purchases-electronics.csv"
  );
  readStream
    .on("close", () => {
        result.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
      return res.send(result);
    })
    .pipe(csv())
    .on("data", (data) => {
      if (result.length == 100) {
        readStream.destroy();
      } else if (data["price"]) {
        let dateStr = data["event_time"].split(" ")[0];
        const i = result.findIndex((e) => e.date === dateStr);
        if (i >= 0) {
          result[i]["price"] += Math.round(
            parseFloat(data["price"] * 100) / 100
          );
        } else {
          result.push({
            date: dateStr,
            price: Math.round(parseFloat(data["price"] * 100) / 100),
          });
        }
      }
    });
}
module.exports = router;
