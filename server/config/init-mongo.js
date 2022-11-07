const { db } = require("../module/User");

require("dotenv").config({path: "./.env"});
db.createUser(
    {
        user: process.env.DB_USER,
        pwd: process.env.DB_PASSWORD,
        roles: [
            { role: 'readWrite', db: process.env.DB_DATABASE }
        ]
    }
)

db.createCollection("users");