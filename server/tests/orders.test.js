const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use("/orders", require("../routes/orders"));
let connection;
const mongoose = require("mongoose");
/* Connecting to the database before each test. */
beforeAll(async () => {
  connection = await mongoose.connect(process.env.MONGO_URL);
  if (connection) {
    console.log("Connected to MongoDB");
  }
});

afterAll(async () => {
  await connection.disconnect();
});

describe("Test order retrieval", () => {
  it("Get /orders should not be empty", async () => {
    const res = await request(app).get("/orders").type("json").send();
    expect(res.statusCode).toBe(200);
  });
});