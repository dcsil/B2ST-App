const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const { analyze } = require("../marketing_system/tasks/analytics");
const app = express();
app.use(express.json());
app.use("/marketing", require("../routes/marketing"));
let connection;
const { MongoClient } = require("mongodb");

/* Connecting to the database before each test. */
beforeAll(async () => {
  app.set("script", analyze());
  connection = await MongoClient.connect(process.env.MONGO_URL);
  if (connection) {
    console.log("Connected to MongoDB");
  }
});

afterAll(async () => {
  await connection.close();
  let script = app.get("script");
  await script.kill();
});

describe("Test the ML model initiation", () => {
  test("Analyze function should run correctly", async () => {
    let script = app.get("script");
    expect(script).not.toBe(null);
  });
});

describe("POST /marketing/query", () => {
  it("should return marketing prediction", async () => {
    const res = await request(app)
      .post("/marketing/query")
      .type("json")
      .send({
        query: [
          [
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei",
          ],
        ],
      });
    expect(res.statusCode).toBe(200);
  });
  it("should return consecutive predictions", async () => {
    const res = await request(app)
      .post("/marketing/query")
      .type("json")
      .send({
        query: [
          [
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei",
          ],
        ],
      });
    expect(res.statusCode).toBe(200);
    const res2 = await request(app)
      .post("/marketing/query")
      .type("json")
      .send({
        query: [
          [
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei",
          ],
        ],
      });
    expect(res2.statusCode).toBe(200);
  });
  it("should return multiple predictions", async () => {
    const res = await request(app)
      .post("/marketing/query")
      .type("json")
      .send({
        query: [
          [
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei",
          ],
          [
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei",
          ],
        ],
      });
    expect(res.statusCode).toBe(200);
  });
});
