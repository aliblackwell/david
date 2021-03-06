'use strict';

angular.module('david.blank', ['firebase'])

  .controller('blankCtrl', ['$scope', function ($scope){

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
