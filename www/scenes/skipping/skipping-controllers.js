'use strict';

angular.module('david.skipping', [])
  .controller('skippingCtrl', ['$scope', 'User', 'SkippingStore', '$state', function ($scope, User, SkippingStore, $state){
    var currentSection, images, store, numberOfDecisions;
    $scope.d = {}

    $scope.d.active = true;


    var user = new User();

    user.$loaded().then(function() {
      loadDatabase();
    });



    var loadDatabase = function() {
      currentSection = $state.current.name;
      store = new SkippingStore(currentSection);
    }

    $scope.startSkipping = function() {
      $scope.d.active = true;
      $scope.d.start = false;
      store[user.$id] = {};
      store[user.$id].start = Date.now();
      store.$save();

    }

    $scope.stopSkipping = function() {

      $scope.d.finish = true;
      $scope.d.active = false;
      store[user.$id].end = Date.now();
      store.$save();
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
