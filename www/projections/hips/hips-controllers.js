'use strict';

angular.module('projections.hips', [])
  .controller('hipsCtrl', ['$scope', 'Hips', 'HipsResults', function ($scope, Hips, HipsResults){

    var hips, results;
    $scope.d = {}
    $scope.d.newWidth = 50;

    hips = new Hips();

    hips.$loaded().then(function() {
      watchResults();
    })

    var watchResults = function() {
      results = new HipsResults();
      // Every time the results change in Firebase
      $scope.unwatchResults = results.$watch(function() {
        if(results[hips.voteIteration]) {
          $scope.d.newWidth = results[hips.voteIteration].avg;
        }
      });
    }







  }])
