const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const db = require("../config/db");
const phone = process.env.PHONE_NUMBER;
const testPhone = process.env.TEST_PHONE;
const {sendSMS,getSMS,router }= require("../routes/sms");

const app = express();
app.use(express.json());
app.use("/sms", router);

/* Connecting to the database before each test. */
beforeAll(async () => {
    await db.connect(()=>{});
});

/* Closing database connection after each test. */
afterAll(async () => {
    await db.clear();
    await db.drop();
    await db.close();
});

describe("POST /sms/sendAll", () => {
    it("should not send with empty req body", async () => {
      const res = await request(app).post("/sms/sendAll");
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Missing required fields");
    });

    it("should not send with unverified phone", async () => {
        const req = {mes: "test",to: ["+1111111111"],user:"sample@test.com",hasCode: false};
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Phone number is not verified");
    });

    it("should send with verified phone", async () => {
        const req = {
            mes: "test",
            to: [testPhone],
            user:"sample@test.com",
            hasCode: false
        };
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(200);
    });
});