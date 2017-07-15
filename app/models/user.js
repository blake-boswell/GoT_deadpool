// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create Schema and models
var CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field required"]
  },
  value:{
    type: Number,
    required: [true, "Value field required"]
  },
  winner: {
    type: Boolean,
    default: false
  },
});

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field required"]
  },
  pick: {
    type: CharacterSchema,
    default: null
  },
});

var User = mongoose.model("user", UserSchema);

module.exports = User;
