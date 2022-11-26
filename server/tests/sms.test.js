const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const db = require("../config/db");
const phone = process.env.PHONE_NUMBER;
const {sendSMS,getSMS,router }= require("../routes/sms");

const app = express();
app.use(express.json());
app.use("/sms", router);

/* Connecting to the database before each test. */
beforeEach(async () => {
    await db.connect(()=>{});
});

/* Closing database connection after each test. */
afterEach(async () => {
    await db.close();
});

describe("POST /sms/sendAll", () => {
    it("should not send with empty req body", async () => {
      const res = await request(app).post("/sms/sendAll");
      expect(res.statusCode).toBe(500);
    });

    it("should not send with unverified phone", async () => {
        const req = {mes: "test",to: [phone]};
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(400);
    });
});