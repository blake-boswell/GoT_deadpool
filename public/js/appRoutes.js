angular.module('appRoutes', []).config(["$routeProvider","$locationProvider",
 function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    templateUrl: "views/login.html",
    controller: "loginController"
  }).when("/home", {
    templateUrl: "views/home.html",
    controller: "characterController"
  }).otherwise("/", {
    templateUrl: "views/index.html",
    controller: "characterController"
  });
  $locationProvider.html5Mode(true);
}]);
