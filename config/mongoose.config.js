var mongoose = require("mongoose");

// connect to our mongoDB database
module.exports = function(db) {
  mongoose.connect(db.url);

  mongoose.connection.on("connected", function() {
      console.log("Connected to database ", db.url);
  });

  mongoose.connection.on("error", function(err) {
    console.log("Connection error: " + err);
  });

  mongoose.connection.on("disconnected", function() {
    console.log("Disconnected");
  });
};
