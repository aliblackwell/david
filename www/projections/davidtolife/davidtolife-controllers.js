'use strict';

angular.module('projections.davidtolife', [])
  .controller('davidtolifeCtrl', ['$scope', 'FinishedSwipes', '$timeout', function ($scope, FinishedSwipes, $timeout){

    var timeout1,
        timeout2;
    $scope.d = {}

    var swipes = new FinishedSwipes();
    swipes.$loaded().then(function() {
      showName();
      console.log(swipes);
    })

    var showName = function() {
      $scope.d.showHello = false;
      timeout1 = $timeout(function() {
        if (swipes[0]) {
          var nameObj = swipes[0]

          $scope.d.newName = nameObj.$value;
          swipes.$remove(nameObj).then(function(ref) {
            //ref.key() === item.$id; // true
            runCycle()
          });
        } else {
          $scope.d.newName = '';
          runCycle()
        }
      }, 2000)

    }

    var runCycle = function() {
      $scope.d.showHello = true;
      timeout2 = $timeout(function(){
        showName();
      }, 2000)
    }


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {

      if (timeout1) {
        $timeout.cancel(timeout1);
      }
      if (timeout2) {
        $timeout.cancel(timeout2);
      }
      if(swipes) {
        swipes.$destroy();
      }
    })






  }])
