const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const phone = process.env.TEST_PHONE;
const Contact = require("../models/ContactModel");
const db=require("../config/db");

const app = express();
app.use(express.json());
app.use("/contact", require("../routes/contact"));


/* Connecting to the database before each test. */
beforeAll(async () => {
    await db.connect(()=>{});
});

/* Closing database connection after each test. */
afterAll(async () => {
    await db.close();
});

describe("POST /contact/getAll", () => {
    it("should get all contact of the user", async () => {
      const res =await request(app).post("/contact/getAll").type('json').send({user: 'sample@test.com'});
      expect(res.statusCode).toBe(200);
    });
});

describe("POST /contact/add", () => {

    
    it ("should not add a contact with invalid phone number", async () => {
        const res = await request(app).post("/contact/add").send(
            {
                name: 'People 2',
                phone: '123456789',
                user: 'sample@test.com'
            }
        )
        expect(res.statusCode).toBe(400);
    }, 10000);

    it ("should not add a contact with empty input", async () => {
        const req = {name: '', phone: '', user: ''};
        const res = await request(app).post("/contact/add").type('json').send(req);
        expect(res.statusCode).toBe(400);
    });

    it("should add a contact", async () => {
        const res = await request(app).post("/contact/add").send({
            name: 'People 3',
            phone: phone,
            user: 'sample@test.com'
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('People 3');
    }, 100000);

    it ("should not add a contact with exist phone number", async () => {
        const res = await request(app).post("/contact/add").send(
            {
                name: 'People 4',
                phone: '123456789',
                user: 'sample@test.com'
            }
        )
        expect(res.statusCode).toBe(400);
    }, 10000);
});
