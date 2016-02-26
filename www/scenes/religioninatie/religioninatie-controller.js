'use strict';

angular.module('david.religioninatie', [])
  .controller('religioninatieCtrl', ['$scope', function ($scope){

    console.log('going')
    ripplyScott.init('js-ripple-btn', 0.75);


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      ripplyScott.destroy();
    });


  }])