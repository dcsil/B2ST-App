const express = require("express");
const router = express.Router();
const { query } = require("../marketing_system/tasks/analytics");
router.post("/query", async (req, res) => {
    query(req, res, req.app.get("script"));
});
module.exports = router;
