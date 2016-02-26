'use strict';

angular.module('david.mundane', [])

  .controller('mundaneCtrl', ['$scope', '$interval', function ($scope, $interval){

    var x = false;

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.laughter = '';

    var intWatch;

    var laughArray = ['lmao','haha','lol','rofl','lolz','hahaha','lolz','ha','haha', 'ooooo','hehehe']

    $scope.$watch('d.laughing', function(newVal) {
      console.log(newVal)
      if (newVal === true) {
        intWatch = $interval(function() {
          $scope.d.laughter += laughArray[Math.floor(Math.random()*laughArray.length)] + ' ';
        }, 2)
      }

      if (newVal === false) {
        $scope.d.laughter = '';
        if (intWatch) {
          $interval.cancel(intWatch);
        }
      }
    })

    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (x) {
        x.$destroy()
      }
    });

  }])
