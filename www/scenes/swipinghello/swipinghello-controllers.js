'use strict';

angular.module('david.swipinghello', [])

  .controller('swipinghelloCtrl', ['$scope', function ($scope){

    var x = false;

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.greeting = "Hello, World!";

    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (x) {
        x.$destroy()
      }
    });

  }])
