const express = require("express");
const router = express.Router();
const Purchase = require("../models/PurchaseModel");
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
  Purchase.find().sort({$natural:1}).limit(10000).then((purchases) => {
    purchases.forEach((data) => {
      if (data["price"]) {
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
    result.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    res.send(result);
  });
}
module.exports = router;
