angular.module('david.controllers', [])

  .controller('homeCtrl', ['$scope', function ($scope){
    $scope.d = {};
    $scope.d.section = "HOME";
    console.log("HOMW")
  }])

  .controller('interactiveCtrl', ['$scope', function ($scope){
    $scope.d = {};
    $scope.d.section = "INTERACTIVE"
    console.log("interactiveCtrl")
  }])

  .controller('statsCtrl', ['$scope', function ($scope){
    $scope.d = {};
    $scope.d.section = "STATS";
    console.log("Stats Ctrl")
  }])