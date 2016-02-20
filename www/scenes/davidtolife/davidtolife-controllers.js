'use strict';

angular.module('david.davidtolife', [])
  .controller('davidtolifeCtrl', ['$scope', 'User', 'FinishedSwipes', '$ionicSlideBoxDelegate', function ($scope, User, FinishedSwipes, $ionicSlideBoxDelegate){

    var lifeSwipes,
        counter = 0;

    $scope.d = {}

    $scope.d.slideactive = true;
    $scope.d.show = true;

    $scope.turnImages = [
      'DT1.JPG',
      'DT2.JPG',
      'DT3.JPG',
      'DT4.JPG',
      'DT5.JPG',
      'DT6.JPG',
      'DT7.JPG',
      'DT8.JPG',
      'DT9.JPG',
      'DT10.JPG',
      'DT11.JPG',
      'DT12.JPG',
      'DT13.JPG',
      'DT14.JPG',
      'DT15.JPG'
    ]

    var user = new User();

    user.$loaded().then(function(){
      user.uuid = user.$id;
    });

    $scope.slideHasChanged = function(index) {
      if (index === $scope.turnImages.length + 1) {
        $scope.setFinishedSwiping();
      }
    }

    $scope.setFinishedSwiping = function() {
      var finished = new FinishedSwipes();
      finished.$add(user.name);
      $scope.d.slideactive = false;
      $ionicSlideBoxDelegate.enableSlide(false);

    }


  }])
