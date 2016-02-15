'use strict';
angular.module('david.scanning', [])
  .controller('scanningCtrl', ['$scope', 'ScanningWords', function ($scope, ScanningWords){
    var words = ScanningWords;
    words.$loaded().then(function() {

    })

    words.$bindTo($scope, 'words');

    $scope.tapWord = function(word) {
      word.tapCount++;
    }

    $scope.showScanningTab = true;

  }])
