const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose =  require("mongoose");
const passport =  require("passport");
const bodyParser =  require("body-parser");
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

recordRoutes.use(bodyParser.urlencoded(
      { extended:true }
))
recordRoutes.use(require("express-session")({
  secret:"wafae",       //decode or encode session
  resave: false,          
  saveUninitialized:false    
}));

const ObjectId = require("mongodb").ObjectId;
recordRoutes.use(passport.initialize());
recordRoutes.use(passport.session());
let current;

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }else{
    res.redirect("/login");
  }
}
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(isLoggedIn , function (req, res) {
  console.log("req user",req.user)
    let db_connect = dbo.getDb("demandes");
    db_connect
   .collection("demandes")
   .find({})
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
    console.log("result",result)
  });
  current=username
});


// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
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
recordRoutes.route("/user/:id").get(function (req, res) {
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
 db_connect.collection("demandes").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
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
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
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
recordRoutes.route("/:id").delete(isLoggedIn ,(req, response) => {
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
