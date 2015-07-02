// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'ngImgCrop'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data):/);
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
  new Darkroom('#darkroom', {
    // Canvas initialization size
    minWidth: 100,
    minHeight: 100,
    maxWidth: 500,
    maxHeight: 500,

    // Plugins options
    plugins: {
      crop: {
        minHeight: 50,
        minWidth: 50,
        ratio: 1
      }
    },
  });

  $scope.gotText = "text will appear here";

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      //$scope.lastPhoto = imageURI;
      //$scope.loadCanvas(imageURI);
      $scope.myImage = imageURI;
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
      context.drawImage(this, 0, 0, 300, 300);
      var string = OCRAD(context);
      console.log("OCRAD got this text:" + string);
      $scope.$apply(function(){
        if(string === "") {
          string = "Could not recognize any text. Please try again."
        }
        $scope.gotText = string;
      });
    };
    imageObj.src = dataURL;
  };

  $scope.myImage='';
  $scope.myCroppedImage='';

  var handleFileSelect=function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage=evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };

  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

  $scope.cropChange = function(dataURI) {
    console.log(dataURI);
    $scope.loadCanvas(dataURI);
  }

});

