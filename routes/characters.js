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
var jimp = require("jimp");





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
  jimp.read(req.file.path, function(err, image) {
    if(!err) {
      console.log("No errors! Image is: ");
      console.log(image);
      var width = image.resize(jimp.AUTO, 200).bitmap.width;
      var height = image.resize(jimp.AUTO, 200).bitmap.height;
      console.log("Width: "+ width);
      console.log("Height: " + height);
      if(width > 200) {
        //crop the resized image to 200x200
        image.resize(jimp.AUTO, 200).crop((width - 200)/2, 0, 200, 200).quality(80)
        .write("angular-src/src/assets/uploads/resized_images/resized_"
         + req.file.originalname, function(err) {
           if(err) {
             console.log("[Cropped] Resized file could not be stored at the path " +
             "angular-src/src/assets/uploads/resized_images/\n Error: ");
             console.log(err);
           } else {
             console.log("[Croppped] Success! Resized image stored!");
           }
         });
      } else {
        image.resize(jimp.AUTO, 200).cover(200, 200).quality(80)
        .write("angular-src/src/assets/uploads/resized_images/resized_"
         + req.file.originalname, function(err) {
           if(err) {
             console.log("Resized file could not be stored at the path " +
             "angular-src/src/assets/uploads/resized_images/\n Error: ");
             console.log(err);
           } else {
             console.log("Success! Resized image stored!");
           }
         });
      }

    } else {
      console.log("Couldn't find file at path " + req.file.path);
      console.log(err);
    }

  })

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
