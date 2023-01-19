const express = require("express");
const app = express();
const session = require("express-session")
const cors = require("cors");
const passport =  require("passport");
const bodyParser =  require("body-parser");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(
  session({
    secret: 'a1s2d3f4g5h6',
    resave: true,
    saveUninitialized: false,
  })
)
app.use(bodyParser.urlencoded(
  { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});