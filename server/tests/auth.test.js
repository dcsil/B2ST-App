const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");
const print = console.log
const app = express();
app.use(express.json());
const router = require("../routes/plans")
/* Connecting to the database before each test. */
app.use("/", router);

beforeAll(async () => {
    
    connection = await MongoClient.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("Connected to MongoDB");
    }
  });
  
  afterAll(async () => {
    await connection.close();
  });


describe("GET /plans/price", () => {
    it("should not have error status", async () => {
      const res = await request(app).get("/plans/price");
        expect(res).not.toBe(null);
        expect(res).not.toBe(404)
    });

    it("should get current plan list", async () => {
        const res = await request(app).get("/plans/price");
          expect(res.body).not.toBe(null);
          expect(res.statusCode).not.toBe(400);
      });
});

describe("GET /plans/price", () => {
    it("should not have error status", async () => {
      const res = await request(app).get("/plans/price");
        expect(res).not.toBe(null);
        expect(res).not.toBe(404)
    });

    it("should get current plan list", async () => {
        const res = await request(app).get("/plans/price");
          expect(res.body).not.toBe(null);
          expect(res.statusCode).not.toBe(400);
      });
});


describe("POST /subs", () => {
    it("should get the plan of the sended user", async () => {
      const res = await request(app)
        .post("/subs")
        .type("json")
        .send({
            "email": "a@a.com"
        });
    // print("+++++++++++++++++++++++++++++++++++++++++")
    // print(res.body)
      expect(res.statusCode).not.toBe(400);
      expect(res.body).not.toBe(null)
    });
    
  });
  