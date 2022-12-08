const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const db = require("../config/db");
const phone = process.env.TWILIO_PHONE_NUMBER;
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
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Missing required fields");
    });

    it("should not send with invalid phone", async () => {
        const req = {mes: "test",to: ["+1111111111"],user:"sample@test.com",hasCode: false};
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(207);
        expect(res.body.error).toContain("Some messages failed to send");
        // twilio error 21211 Invalid 'To' Phone Number
        expect(res.body.result[0].reason.code).toBe(21211);
        expect(res.body.result[0].reason.status).toBe(400);
        expect(res.body.result[0].status).toBe("rejected");
    });

    it("should send with verified phone", async () => {
        const req = {
            mes: "test",
            to: [testPhone],
            user:"sample@test.com",
            hasCode: true,
        };
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Messages sent successfully");
        expect(res.body.result[0].status).toBe("fulfilled");
    });

    it("should not send a scheduled mes with invalid date", async () => {
        const req = {
            mes: "test",
            to: [testPhone],
            user:"sample@test.com",
            sendAt: "2020-01-01",
            hasCode: false,
        };
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(207);
        expect(res.body.result[0].reason.status).toBe(400);
        expect(res.body.result[0].status).toBe("rejected");
    });

    it("should send a scheduled mes with valid date", async () => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const req = {
            mes: "test",
            to: [testPhone],
            user:"sample@test.com",
            sendAt: tomorrow,
            hasCode: false,
        };
        const res = await request(app).post("/sms/sendAll").type('json').send(req);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Messages sent successfully");
        expect(res.body.result[0].status).toBe("fulfilled");
    });
});

describe("POST /sms/getRecords", () => {
    it("should not get records with empty req body", async () => {
        const res = await request(app).post("/sms/getRecords");
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Missing user");
    });

    it("should get records with correct user", async () => {
        const res = await request(app).post("/sms/getRecords").type('json').send({user:"sample@test.com"});
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("POST /sms", () => {
    it("should get response", async () => {
        const res = await request(app).post("/sms");
        expect(res.statusCode).toBe(200);
    });
});