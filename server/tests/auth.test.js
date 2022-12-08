// const express = require("express");
// require("dotenv").config({ path: "./.env" });
// const db = require("../config/db");


// const app = express();
// app.use(express.json());
// app.use("/sms", router);

// /* Connecting to the database before each test. */
// beforeAll(async () => {
//     await db.connect(()=>{});
// });

// // describe("POST /", () => {
// //     it("should not get contact with empty req", async () => {
// //         const res =await request(app).post("/contact/getAll").type('json').send({});
// //         expect(res.statusCode).toBe(400);
// //     });

// //     it("should get all contact of the user", async () => {
// //       const res =await request(app).post("/contact/getAll").type('json').send({user: 'sample@test.com'});
// //       expect(res.statusCode).toBe(200);
// //     });
// // });
