require("dotenv").config({ path: "../.env" });

db.createUser(
    {
        user: process.env.DB_USER,
        pwd: process.env.DB_PASSWORD,
        roles: [
            { role: 'readWrite', db: process.env.DB_DATABASE }
        ]
    }
)
db.createCollection("users"); //MongoDB creates the database when you first store data in that database
