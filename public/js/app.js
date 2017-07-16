var deadPool = angular.module("deadPool", ["ngRoute"]);

//Set up facebook login
window.fbAsyncInit = function() {
    FB.init({
      appId            : '1965730737036482',
      autoLogAppEvents : true,
      xfbml            : true,
      status           : true,
      cookie           : true,
      version          : 'v2.9'
    })
    FB.AppEvents.logPageView();

    // Check if the current user is logged in and has authorized the app
    FB.getLoginStatus(checkLoginStatus);

    // Login in the current user via Facebook and ask for email permission
    function authUser() {
      FB.login(checkLoginStatus, {scope:'email'});
    }

    // Check the result of the user status and display login button if necessary
    function checkLoginStatus(response) {
      if(response && response.status == 'connected') {
        alert('User is authorized');
        var userStatus = response.status;

        // Hide the login button
        document.getElementById('login-section').style.display = 'none';

        // Now Personalize the User Experience
        console.log('Access Token: ' + response.authResponse.accessToken);
      } else {
        alert('User is not authorized');

        // Display the login button
        document.getElementById('login-section').style.display = 'block';
      }
    }

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
