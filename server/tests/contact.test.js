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
    await db.clear();
    await db.drop();
    await db.close();
});

describe("POST /contact/getAll", () => {
    it("should not get contact with empty req", async () => {
        const res =await request(app).post("/contact/getAll").type('json').send({});
        expect(res.statusCode).toBe(400);
    });

    it("should get all contact of the user", async () => {
      const res =await request(app).post("/contact/getAll").type('json').send({user: 'sample@test.com'});
      expect(res.statusCode).toBe(200);
    });
});

let id;

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
        id = res.body._id;
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

describe('POST /contact/update', () => {
    it("should not update a contact with empty input", async () => {
        const res = await request(app).post("/contact/update").send({});
        expect(res.statusCode).toBe(400);
    });
    it("should not update a not exist contact", async () => {
        const res = await request(app).post("/contact/update").send({
            oldContact: {phone: '123'},
            newContact: {name: 'People 3', phone: '1234'},
            user: 'sample@test.com'});
        expect(res.statusCode).toBe(404);
    });

    it("should update a contact", async () => {
        const res = await request(app).post("/contact/update").send({
            oldContact: {phone: phone},
            newContact: {name: 'People 3'},
            user: 'sample@test.com'});
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /contact/delete", () => {
    it("should not delete a contact not exist", async () => {
        const res = await request(app).post("/contact/delete").send({id: '123456789'});
        expect(res.statusCode).toBe(404);
    });

    if("should delete a contact", async () => {
        const res = await request(app).post("/contact/delete").send({id: id});
        expect(res.statusCode).toBe(200);
    });
});
