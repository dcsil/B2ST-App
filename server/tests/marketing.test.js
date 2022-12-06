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

describe("Test the ML model initiation", () => {
    test("Analyze function should run correctly", async () => {
        let script = app.get("script");
        expect(script).not.toBe(null);
    }); 
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
    it("should return consecutive predictions", async () => {
        const res = await request(app).post("/marketing/query").type('json').send({query: [[    
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei"
        ]]});
        expect(res.statusCode).toBe(200);
        const res2 = await request(app).post("/marketing/query").type('json').send({query: [[
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei"
        ]]});
        expect(res2.statusCode).toBe(200);
    });
    it("should return multiple predictions", async () => {
        const res = await request(app).post("/marketing/query").type('json').send({query: [[
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei"
        ], [
            "2388440981134609919",
            "2273948312304353947",
            "smartphone",
            "huawei"
        ]]});
        expect(res.statusCode).toBe(200);
    });
});