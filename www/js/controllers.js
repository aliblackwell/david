angular.module('david.controllers', [])

  // .controller('appCtrl', ['$scope', function ($scope){
  //   console.log('App')
  // }])

  // .controller('interactiveCtrl', ['$scope', '$location', '$state', 'Settings', function ($scope, $location, $state, Settings){
  //   var settings = Settings;
  //   settings.$loaded().then(function(){

  //     $location.url('/tab/'+settings.section);
  //   })
  //   console.log($scope)
  //   $scope.settings = settings;
  //   $scope.$state = $state
  //   console.log($scope.$state)


  // }])

  .controller('scanningwordsCtrl', ['$scope', 'ScanningWords', function ($scope, ScanningWords){
    var words = ScanningWords;
    words.$loaded().then(function() {
      console.log(words);
    })

    words.$bindTo($scope, 'words');

    $scope.tapWord = function(word) {
      word.tapCount++;
    }


  }])

  .controller('hipsCtrl', ['$scope', function() {
    console.log('HIPS');
  }])

  .controller('tabsCtrl', ['$scope', function() {
    console.log('Tabs');
  }])

  .controller('statsCtrl', ['$scope', function() {
    console.log('Stats');
  }])

  // .controller('listCtrl', ['$scope', 'Items', function ($scope, Items){

  //   $scope.items = Items;

  //   $scope.addItem = function() {
  //     var name = prompt("What buy?");
  //     if (name) {
  //       $scope.items.$add({
  //         "name": name
  //       })
  //     }
  //   };


  // }])

  // .controller('statsCtrl', ['$scope', function ($scope){
  //   $scope.d = {};
  //   $scope.d.section = "STATS";
  //   console.log("Stats Ctrl")
  // }])