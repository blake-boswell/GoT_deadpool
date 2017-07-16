// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Character = require('./character')
var CharacterSchema = Character.schema;

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
