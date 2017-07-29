var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var cors = require("cors");
var passport = require("passport");
var mongoose = require("mongoose");
var db = require('./config/db');

// connect to our mongoDB database
mongoose.connect(db.url);

mongoose.connection.on("connected", function() {
  console.log("Connected to database ", db.url);
});

mongoose.connection.on("error", function(err) {
  console.log("Database error ", err);
});

// Bring in user routes
var users = require("./routes/users");



// set our port
var port = process.env.PORT || 8080;

// cors middleware
app.use(cors());

// bodyParser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, '/public')));

//use user routes at /users/*
app.use("/users", users);


// error handling middleware ===============================
app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message});
});

// Uncomment after ng build
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, function(){
  // shoutout to the user
  console.log('Magic happens on port ' + port);
});



// export app
exports = module.exports = app;
