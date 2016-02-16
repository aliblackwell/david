'use strict';

angular.module('david.skipping', [])
  .controller('skippingCtrl', ['$scope', 'User', 'SkippingStore', function ($scope, User, SkippingStore){
    var currentSection, images, store, numberOfDecisions;
    $scope.d = {}

    $scope.d.question = true;
    $scope.d.result = false;


    var user = new User();

    user.$loaded().then(function() {
      loadDatabase();
    });

    var loadDatabase = function() {
      store = new SkippingStore(currentSection, user);
    }

    $scope.chooseResult = function(answer) {

      $scope.d.question = false;
      $scope.d.result = {};
      if (answer === 'yes') {
        $scope.d.result.yes = true;
        $scope.d.result.no = false;
      } else {
        $scope.d.result.yes = false;
        $scope.d.result.no = true;
      }
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
