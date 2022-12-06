const request = require("supertest");
const express = require("express");
require("dotenv").config({ path: "./.env" });
const db=require("../config/db");
const { analyze } = require("../marketing_system/tasks/analytics");
const app = express();
app.use(express.json());
app.set("script", analyze());
app.use("/marketing", require("../routes/marketing"));

/* Connecting to the database before each test. */
beforeAll(async () => {
    await db.connect(()=>{});
});

/* Closing database connection after each test. */
afterAll(async () => {
    await db.close();
});

describe("POST /marketing/query", () => {
    it("should return marketing prediction", async () => {
        const res = await request(app).post("/marketing/query").type('json').send({query: [[
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei"
        ]]});
        expect(res.statusCode).toBe(200);
    });
});