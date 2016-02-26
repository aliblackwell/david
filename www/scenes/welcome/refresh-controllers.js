'use strict';

angular.module('david.welcome')

  .controller('refreshCtrl', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window){

    localStorage.clear();
    $timeout(function() {
      $window.location = '/'
    },1000);

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {

    });


  }])
