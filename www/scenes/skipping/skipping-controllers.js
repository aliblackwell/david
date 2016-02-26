'use strict';

angular.module('david.skipping', [])
  .controller('skippingCtrl', ['$scope', 'User', 'SkippingStore', '$state', '$timeout', function ($scope, User, SkippingStore, $state, $timeout){
    var currentSection, images, store, numberOfDecisions;
    $scope.d = {}


    var store;


    $timeout(function() {
      $scope.d.enough = true;
    }, 90000);


    var user = new User();

    user.$loaded().then(function() {
      loadDatabase();
    });



    var loadDatabase = function() {
      currentSection = $state.current.name;
      store = new SkippingStore(currentSection, user.$id);
      store.$loaded().then(function(){
        $scope.startSkipping();
      })

    }

    $scope.startSkipping = function() {
      $scope.d.active = true;
      $scope.d.enough = false;
      store[user.$id] = {};
      store[user.$id].start = Date.now();
      store.$save();

    }

    $scope.stopSkipping = function() {

      $scope.d.finish = true;
      $scope.d.active = false;
      $scope.d.enough = false;
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
