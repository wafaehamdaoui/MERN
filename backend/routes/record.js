const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose =  require("mongoose");
const LocalStrategy =  require("passport-local");
//const User =  require("../models/user");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
 //Connecting database
mongoose.connect("mongodb+srv://hasnae:eidia2019@cluster0.oyrevzp.mongodb.net/?retryWrites=true&w=majority");

const ObjectId = require("mongodb").ObjectId;
var current = undefined;

function isLoggedIn(req,res,next) {
  if(current){
    return next();
  }else{
    return res.status(401).json('unauthorize')
  }
}
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(isLoggedIn, function (req, res) {
  console.log("req.user from",req.user)
    let db_connect = dbo.getDb("demandes");
    db_connect
   .collection("demandes")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
recordRoutes.route("/userRecord").get(isLoggedIn, function (req, res) {
  console.log("req.user from",req.user)
    let db_connect = dbo.getDb("demandes");
    db_connect
   .collection("demandes")
   .find({matricul:current.matricul})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
// This section will help you get a list of all the users.
recordRoutes.route("/user").get(isLoggedIn,function (req, res) {
  let db_connect = dbo.getDb("demandes");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

recordRoutes.route("/login").post(function (req, res) {
  let db_connect = dbo.getDb("demandes");
  const { username, password } = req.body;
  db_connect.collection("users")?.findOne({username:username,password:password}, function (err, result) {
    if (err) throw err;
    res.json(result);
    req.user=result;
    current=result;
    req.session.save();
    console.log("result",result)
    console.log("req.user",req.user)
  });
});

recordRoutes.route("/logout").post(isLoggedIn, async (req, res) => {
  current = undefined;
  //req.session.destroy((error) => {
    //if (error) throw error
    //res.clearCookie('session-id') // cleaning the cookies from the user session
    //res.status(200).send('Logout Success')
  //})
})



// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(isLoggedIn,function (req, res) {
 let db_connect = dbo.getDb("demandes");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("demandes")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
// This section will help you get a single user by id
recordRoutes.route("/user/:id").get(isLoggedIn,function (req, res) {
  let db_connect = dbo.getDb("demandes");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(isLoggedIn,function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   matricul: req.body.matricul,
   nom: req.body.nom,
   prenom: req.body.prenom,
   ecole: req.body.ecole,
   ressource: req.body.ressource,
   duree: req.body.duree,
   date: req.body.date,
   status: req.body.status,
 };
 db_connect.collection("demandes").findOne({ressource:myobj.ressource,date:myobj.date,duree:myobj.duree}, function (err, res) {
  if (!res){
    db_connect.collection("demandes").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  }
});
});
 
recordRoutes.route("/register").post(isLoggedIn,function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    matricul: req.body.matricul,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  db_connect.collection("users").findOne({matricul:myobj.matricul,username:myobj.username,email:myobj.email}, function (err, res) {
    if (!res){
      db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
    }
  });
 });
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(isLoggedIn,function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    matricul: req.body.matricul,
    nom: req.body.nom,
    prenom: req.body.prenom,
    ecole: req.body.ecole,
    ressource: req.body.ressource,
    duree: req.body.duree,
    date: req.body.date,
    status: req.body.status,
   },
 };
 db_connect
   .collection("demandes")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 item updated");
     response.json(res);
   });
});

// This section will help you update a user by id.
recordRoutes.route("/updateuser/:id").post(isLoggedIn,function (req, response) {
  console.log("current user",current)
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
     matricul: req.body.matricul,
     username: req.body.username,
     email: req.body.email,
     password: req.body.password,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("user updated");
      response.json(res);
    });
 });
 
// This section will help you delete a record
recordRoutes.route("/:id").delete(isLoggedIn,(req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("demandes").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 item deleted");
   response.json(obj);
 });
});

// This section will help you delete a user
recordRoutes.route("/delete/:id").delete(isLoggedIn,(req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 item deleted");
    response.json(obj);
  });
 });
 
module.exports = recordRoutes;