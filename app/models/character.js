// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');

// create Schema and models
var CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field required"]
  },
  imagePath: {
    type: String,
    default: "na"
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

var Character = mongoose.model("Character", CharacterSchema);

module.exports = {
                    schema: CharacterSchema,
                    model: Character
                  };
module.exports.storeImage = function(character, imgPath) {
    character.img.data = fs.readFileSync(imgPath);
    character.img.contentType = 'image/png';
    character.save(function (err) {
      if (err) throw err;
      console.error('saved img to mongo');
    });
}
