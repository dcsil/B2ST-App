const express = require("express");
const router = express.Router();
const { query } = require("../marketing_system/tasks/analytics");
router.post("/query", async (req, res) => {
    try {
        query(req, res, req.app.get("script"));
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
