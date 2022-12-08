const request = require("supertest");
const express = require("express");


const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

/* Connecting to the database before each test. */
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
    it("should get current plan list", async () => {
      const res = await request(app).get("/plans/price");
        expect(res).not.toBe(null);
    });
});