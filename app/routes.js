// grab the user model we just created
var User = require('./models/user');

    module.exports = function(app) {

        // server routes ===========================================================
      app.get("/api/users/:id", function(req, res, next) {
        User.findOne({_id: req.params.id}).then(function(err, users) {
          if(err) {
            res.send(err);
          } else {
            res.send(users);
          }
        });
      });

      //post user in db
      app.post("/api/users", function(req, res, next) {
          //create a new user model and send it to db
        User.create(req.body).then(function(user) {
          res.send(user);
        }).catch(next);
      });

      //update user in db
      app.put("/api/users/:id", function(req, res, next) {
        User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
          User.findOne({_id: req.params.id}).then(function(user) {
            res.send(user);
          });
        });
      });

      //delete user from db
      app.delete("/api/users/:id", function(req, res, next) {
        User.findByIdAndRemove({_id: req.params.id}).then(function(user) {
          res.send(user);
        });
      });
        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
