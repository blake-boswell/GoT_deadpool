// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var config = require("../../config/db");
var Schema = mongoose.Schema;
var Character = require('./character')
var CharacterSchema = Character.schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field required"]
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pick: {
    type: CharacterSchema,
    default: null
  }
});

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if(err)
        throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isMatch) {
    if(err)
      throw err;
    callback(null, isMatch);
  });
}
