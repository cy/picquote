// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, Camera) {
  $scope.gotText = "text will appear here";

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      //$scope.lastPhoto = imageURI;
      $scope.loadCanvas(imageURI);
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };

  $scope.loadCanvas = function(dataURL) {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    // load image from data url
    var imageObj = new Image();
    imageObj.onload = function() {
      context.drawImage(this, 0, 0, 320, 320);
      var string = OCRAD(context);
      console.log("OCRAD got this text:" + string);
      $scope.$apply(function(){
        $scope.gotText = string;
      });
    };
    imageObj.src = dataURL;
  };

})
