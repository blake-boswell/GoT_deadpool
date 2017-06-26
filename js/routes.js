myApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "index.html",
    controller: "loginCtrl"
  }).otherwise("/", {
    templateUrl: "index.html",
    controller: "characterCtrl"
  });
}]);
