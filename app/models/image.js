var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  fileName: {
    type: String
  },
  originalName: {
    type: String
  },
  contentType: {
    type: String
  }
});

module.exports = mongoose.model("Image", ImageSchema);
