// grab the user model we just created
var User = require('./models/user');
var Character = require('./models/character');
var CharacterModel = Character.model;
var express = require("express");
var router = express.Router();



  // server routes ===========================================================

// gets ========================================================================

router.get("/api/characters/:id", function(req, res, next) {
  CharacterModel.findOne({_id: req.params.id}).then(function(err, characters) {
    if(err) {
      res.send(err);
    } else {
      res.send(characters);
    }
  });
});

// posts =======================================================================

router.post("/api/characters", function(req, res, next) {
    //create a new character model and send it to db
  CharacterModel.create(req.body).then(function(character) {
    res.send(character);
  }).catch(next);
});
// updates =====================================================================
//update character in db
router.put("/api/characters/:id", function(req, res, next) {
  CharacterModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    CharacterModel.findOne({_id: req.params.id}).then(function(character) {
      res.send(character);
    });
  });
});

// deletes =====================================================================

//delete character from db
router.delete("/api/characters/:id", function(req, res, next) {
  CharacterModel.findByIdAndRemove({_id: req.params.id}).then(function(character) {
    res.send(character);
  });
});
  // frontend routes =========================================================
  // route to handle all angular requests
  router.get('*', function(req, res) {
      res.sendFile('/public/views/index.html', {root: "./"}); // load our public/index.html file
  });

module.exports = router;
