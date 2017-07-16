// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CharacterSchema = require('./character')

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
