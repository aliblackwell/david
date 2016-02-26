'use strict';

angular.module('david.religioninatie', [])
  .controller('religioninatieCtrl', ['$scope', 'user', 'BopsUserStore', function ($scope, user, BopsUserStore){

    var store = new BopsUserStore(user);
    ripplyScott.init('js-ripple-btn', 0.75, store);


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      ripplyScott.destroy();
    });


  }])