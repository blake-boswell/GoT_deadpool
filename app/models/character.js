// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create Schema and models
var CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field required"]
  },
  image: {
    type: String
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

var Character = mongoose.model("character", CharacterSchema);

module.exports = {
                    schema: CharacterSchema,
                    model: Character
                  };
