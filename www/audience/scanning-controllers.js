angular.module('david.scanningControllers', [])

  .controller('scanningwordsTabsCtrl', ['$scope', '$timeout', '$ionicTabsDelegate', '$state', function ($scope, $timeout, $ionicTabsDelegate, $state){

    $timeout(function() {
      $ionicTabsDelegate.select(1);
    }, 20);
  }])

  .controller('scanningwordsCtrl', ['$scope', 'ScanningWords', function ($scope, ScanningWords){
    var words = ScanningWords;
    words.$loaded().then(function() {

    })

    words.$bindTo($scope, 'words');

    $scope.tapWord = function(word) {
      word.tapCount++;
    }

    $scope.showScanningTab = true;

  }])
