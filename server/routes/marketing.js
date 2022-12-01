const express = require("express");
const router = express.Router();
const { queryPurchases, queryEvents } = require("../marketing_system/tasks/analytics");
router.post("/query", async (req, res) => {
    try {
        if(req.body.type == "purchases") {
            queryPurchases(req, res, req.app.get("script_purchases"));
        } else if(req.body.type == "events") {
            queryEvents(req, res, req.app.get("script_events"));
        } else {
            res.status(400).json({ error: "Invalid query type" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
