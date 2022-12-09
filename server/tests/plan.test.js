const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");
const print = console.log
const app = express();
app.use(express.json());

app.use("/plans", require("../routes/plans"));
app.use("/subs", require("../routes/subs"))

const mongoose = require("mongoose");
beforeAll(async () => {
    
    connection = await MongoClient.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("Connected to MongoDB");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     }).then((result) => {
      console.log(result.connection.readyState)  
      console.log(result.connection.host)
     }).catch((err) => {
    
     });;
  });
  
  afterAll(async () => {
    await connection.close();
  });


describe("POST /plans/price", () => {
    it("should not have error status", async () => {
      const res = await request(app).post("/plans/price").send({});
        expect(res).not.toBe(null);
        expect(res).not.toBe(404)
    });

    it("should get current plan list", async () => {
        const res = await request(app).get("/plans/price").send({});
          expect(res.body).not.toBe(null);
          expect(res.statusCode).toBe(200);
      });
});

describe("POST /plans/price", () => {
    it("should not have error status", async () => {
      const res = await request(app).post("/plans/price").send({});
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
            "": ""
        });
    // print("+++++++++++++++++++++++++++++++++++++++++")
    // print(res.body)
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({"error": "Authenticated user not found"})
    });
    
  });
  