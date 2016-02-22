'use strict';

angular.module('david.waltz', ['firebase'])

  .controller('waltzCtrl', ['$scope', 'WaltzGroups', function ($scope, WaltzGroups){

    var groupListener;

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.showLight = false;

    // randomly assign them to a group
    var options = ['g1', 'g2', 'g3'];
    $scope.group = options[Math.floor(Math.random()*options.length)]
    groupListener = new WaltzGroups();
    $scope.unwatchResults = groupListener.$watch(function() {

      if (groupListener[$scope.group] === 'off') {
        $scope.d.black = 'black';
      }
    })


    $scope.lightsOn = function() {
      $scope.d.showLight = true;
    }

    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (groupListener) {
        groupListener.$destroy();
      }
    });

  }])
