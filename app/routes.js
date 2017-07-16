// grab the user model we just created
var User = require('./models/user');
var Character = require('./models/character');

    module.exports = function(app) {

        // server routes ===========================================================
// gets ========================================================================
      app.get("/api/users/:id", function(req, res, next) {
        User.findOne({_id: req.params.id}).then(function(err, users) {
          if(err) {
            res.send(err);
          } else {
            res.send(users);
          }
        });
      });

      app.get("/api/characters/:id", function(req, res, next) {
        Character.findOne({_id: req.params.id}).then(function(err, characters) {
          if(err) {
            res.send(err);
          } else {
            res.send(characters);
          }
        });
      });

// posts =======================================================================
      //post user in db
      app.post("/api/users", function(req, res, next) {
          //create a new user model and send it to db
        User.create(req.body).then(function(user) {
          res.send(user);
        }).catch(next);
      });

      app.post("/api/characters", function(req, res, next) {
          //create a new character model and send it to db
        Character.create(req.body).then(function(character) {
          res.send(character);
        }).catch(next);
      });
// updates =====================================================================
      //update user in db
      app.put("/api/users/:id", function(req, res, next) {
        User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
          User.findOne({_id: req.params.id}).then(function(user) {
            res.send(user);
          });
        });
      });

      //update character in db
      app.put("/api/characters/:id", function(req, res, next) {
        Character.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
          Character.findOne({_id: req.params.id}).then(function(character) {
            res.send(character);
          });
        });
      });

// deletes =====================================================================
      //delete user from db
      app.delete("/api/users/:id", function(req, res, next) {
        User.findByIdAndRemove({_id: req.params.id}).then(function(user) {
          res.send(user);
        });
      });

      //delete character from db
      app.delete("/api/characters/:id", function(req, res, next) {
        Character.findByIdAndRemove({_id: req.params.id}).then(function(character) {
          res.send(character);
        });
      });
        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
