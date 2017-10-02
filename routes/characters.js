// grab the user model we just created
var User = require('../app/models/user');
var Character = require('../app/models/character');
var CharacterModel = Character.model;
var Image = require("../app/models/image");
var express = require("express");
var router = express.Router();
var path = require("path");

var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'angular-src/src/assets/uploads/');
  },
  filename: function (req, file, cb) {
    console.log("MIMETYPE: " + file.mimetype);
    console.log("FILE param");
    console.log(file);
    cb(null, file.originalname); //Appending .jpg
  }
});

var upload = multer({ storage: storage });

var fs = require('fs');





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

//get all characters
router.get("/api/characters", function(req, res, next) {
  CharacterModel.find({}).then(function(characters, err) {
    if(err) {
      res.send(err);
    } else {
      res.send(characters);
    }
  });
});

//get an image by image name
router.get("/api/image/:name", function(req, res) {
  Image.findOne({originalName: req.params.name}).then(function(image, err) {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      if(image) {
        console.log("image: " + image);
        res.setHeader("Content-Type", image.contentType);
        fs.createReadStream(path.join('uploads', image.fileName)).pipe(res);
      } else {
        //no image
        console.log("oops");
        res.sendStatus(400);
      }

    }
  });
});

//get all images
router.get("/api/images", function(req, res) {
  Image.find({}).then(function(images, err) {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      if(images) {
        res.send(images);
      } else {
        //no image
        console.log("oops");
        res.sendStatus(400);
      }

    }
  });
});


// posts =======================================================================

router.post("/api/characters", function(req, res, next) {
  //create a new character model and send it to db
  console.log("Request: " + req.body.name);
  console.log("Request.body: ");
  console.log(req.body);
  console.log("imageName " + req.body.imageName);

  CharacterModel.create(req.body).then(function(character) {

    res.send(character);
  }).catch(next);
});

router.post("/api/image", upload.single('photo'), function(req, res, next) {
  console.log("POSTING IMAGE");
  console.log(req.file);
  Image.create(
    {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      contentType: req.file.mimetype
    }).then(function(image) {
    res.send(req.file);
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
