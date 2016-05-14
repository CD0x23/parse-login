// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'LoginCtrl'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // form input state geçiş
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // Initialize Parse 
    Parse.initialize("YOUR APP ID", "JAVASCRIPT KEY");

  });
})

.controller('LoginCtrl', function($scope, $state) {

  $scope.data = {};

  $scope.signupEmail = function(){

    //Parse serverda yeni bir kullanıcı oluştur
    var user = new Parse.User();
    user.set("username", $scope.data.username);
    user.set("password", $scope.data.password);
    user.set("email", $scope.data.email);

    user.signUp(null, {
      success: function(user) {
        // Başarılı
        alert("success!");
      },
      error: function(user, error) {
        // Hata
        alert("Error: " + error.code + " " + error.message);
      }
    });

  };

  $scope.loginEmail = function(){
    Parse.User.logIn($scope.data.username, $scope.data.password, {
      success: function(user) {
        // Başarılı
        console.log(user);
        alert("success!");
      },
      error: function(user, error) {
        // Hata
        alert("error!");
      }
    });
  };

});
