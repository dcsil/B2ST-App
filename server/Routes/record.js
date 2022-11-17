const express = require("express");
const recordRoutes = express.Router();
const db = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
 
 
// Get all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = db.getDb("employees");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Get record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = db.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// add record
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = db.getDb();
 let myobj = {
//    name: req.body.name,
//    position: req.body.position,
//    level: req.body.level,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

module.exports = recordRoutes;
