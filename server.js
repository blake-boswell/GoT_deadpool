var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var cors = require("cors");
var passport = require("passport");

var db = require('./config/db');

// Bring in user routes
var users = require("./routes/users");
var characters = require("./routes/characters");

require("./config/mongoose.config")(db)

// set our port
var port = process.env.PORT || 8000;

// cors middleware
app.use(cors());

// bodyParser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//use user routes at /users/*
app.use("/users", users);
app.use(characters);


// error handling middleware ===============================
app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message});
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, function(){
  // shoutout to the user
  console.log('Magic happens on port ' + port);
});



// export app
exports = module.exports = app;
