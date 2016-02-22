'use strict';

angular.module('david.skipping', [])
  .controller('skippingCtrl', ['$scope', 'User', 'SkippingStore', function ($scope, User, SkippingStore){
    var currentSection, images, store, numberOfDecisions;
    $scope.d = {}

    $scope.d.start = true;


    var user = new User();

    user.$loaded().then(function() {
      loadDatabase();
    });

    var loadDatabase = function() {
      store = new SkippingStore(currentSection, user);
    }

    $scope.startSkipping = function() {
      $scope.d.active = true;
      $scope.d.start = false;
    }

    $scope.stopSkipping = function() {

      $scope.d.finish = true;
      $scope.d.active = false;
    }

    $scope.resetView = function() {
      $scope.d.question = true;
      $scope.d.result = false;
    }


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (user) {
        user.$destroy()
      }
      if (store) {
        store.$destroy();
      }
      if($scope.unwatchResults) {
        $scope.unwatchResults();
      }

    });
  }])
