deadPool.controller("loginCtrl", ["$scope", function($scope) {
  $scope.FBLogin = function() {
    console.log("Button pressed");
    FB.login(function(response) {
      console.log("login response: ", response);
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
         console.log(response);

         var accessToken = FB.getAuthResponse().accessToken;
         console.log("accessToken: ", accessToken);
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    });
  };
}]);
