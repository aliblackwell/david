'use strict';

angular.module('david.davidtolife', ['firebase'])
  .controller('davidtolifeCtrl', ['$scope', 'User', '$ionicSlideBoxDelegate', 'preloader', 'SwipeImages', 'DavidToLifeResults', 'FinishedSwipesScenes', function ($scope, User, $ionicSlideBoxDelegate, preloader, SwipeImages, DavidToLifeResults, FinishedSwipesScenes){
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
        result = new DavidToLifeResults(user.uuid);
        result.start = Date.now();
        result.$save()


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
      var finished = new FinishedSwipesScenes(user.$id);
      finished.$value = user.name;
      finished.$save();
      $scope.d.slideactive = false;
      $ionicSlideBoxDelegate.enableSlide(false);
      result.end = Date.now();
      result.$save()
    }
  }])
