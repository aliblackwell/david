'use strict';

angular.module('projections.selectshow', [])

  .controller('selectshowCtrl', ['$scope', '$rootScope', 'AvailablePerformances', function ($scope, $rootScope, AvailablePerformances){

    var performances;

    // Workaround for ion-content bug
    $scope.d = {};

    performances = new AvailablePerformances();
    performances.$loaded().then(function() {
      $scope.d.performances = performances;
    });

    $scope.setShow = function() {
      console.log($scope.d.activeShow)
      if ($scope.d.activeShow) {
        localStorage.setItem('showId', $scope.d.activeShow);
      }
      $rootScope.watchSettings();
    }


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (performances) {
        performances.$destroy()
      }
    });

  }])
