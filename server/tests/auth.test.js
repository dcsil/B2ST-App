const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const db = require("../config/db");
const phone = process.env.PHONE_NUMBER;
const testPhone = process.env.TEST_PHONE;
const {router}= require("../routes/plans");

const app = express();
app.use(express.json());
app.use("/plans", router);

/* Connecting to the database before each test. */
beforeAll(async () => {
    await db.connect(()=>{});
});


describe("GET /plans/price", () => {
    it("should get current plan list", async () => {
      const res = await request(app).get("/plans/price");
      expect(res.statusCode).toBe(200);
    });

});