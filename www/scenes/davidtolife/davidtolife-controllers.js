'use strict';

angular.module('david.davidtolife', ['firebase'])
  .controller('davidtolifeCtrl', ['$scope', 'User', '$ionicSlideBoxDelegate', 'preloader', 'SwipeImages', 'DavidToLifeResults', 'FinishedSwipes', function ($scope, User, $ionicSlideBoxDelegate, preloader, SwipeImages, DavidToLifeResults, FinishedSwipes){
    var user,
        result,
        lifeSwipes,
        counter = 0;

    $scope.turnImages = SwipeImages;

    preloader.preloadImages($scope.turnImages)
    .then(function() {
      init();
    })

    var init = function() {
      $scope.d = {}
      $scope.d.slideactive = true;

      user = new User();
      user.$loaded().then(function(){
        user.uuid = user.$id;
        result = new DavidToLifeResults();
        result.$loaded().then(function() {
          result[user.$id] = {}
          result[user.$id].start = Date.now();
          result.$save()
        })

        // change the blobs to arrows
        var icons = document.querySelectorAll('.icon.ion-record');
        for(var i = 0; i < icons.length; i++) {
          icons[i].className = 'icon ion-arrow-right-c'
        }
        $scope.d.show = true;
      });


    }

    $scope.slideHasChanged = function(index) {
      if (index === $scope.turnImages.length + 1) {
        $scope.setFinishedSwiping();
      }
    }

    $scope.setFinishedSwiping = function() {
      var finished = new FinishedSwipes();
      finished.$add(user.name);
      finished.$save();
      $scope.d.slideactive = false;
      $ionicSlideBoxDelegate.enableSlide(false);
      result[user.$id].end = Date.now();
      result.$save()
    }
  }])
