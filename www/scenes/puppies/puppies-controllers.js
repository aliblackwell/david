'use strict';
angular.module('david.puppies', [])
  .controller('puppiesCtrl', ['$scope', 'PuppiesWords', '$timeout', function ($scope, PuppiesWords, $timeout){



    var words = PuppiesWords;

    $scope.d = {}

    $scope.d.prep = true;
    words.$loaded().then(function() {

    })

    words.$bindTo($scope, 'words');

    $scope.tapWord = function(word) {
      word.tapCount++;
    }

    $timeout(function() {
      $scope.d.prep = false;
    }, 2000);



  }])
