angular.module('david.controllers', [])

  .controller('homeCtrl', ['$scope', function ($scope){
    $scope.d = {};
    $scope.d.section = "HOME";
    Ionic.io();

    var push = new Ionic.Push({});

    push.register(function(token) {
      console.log(token)
      $scope.d.section = token.token
      // Log out your device token (Save this!)
      console.log("Got Token:",token.token);
    });
  }])

  .controller('interactiveCtrl', ['$scope', '$location', 'Settings', function ($scope, $location, Settings){
    var settings = Settings;
    settings.$loaded().then(function(){
      console.log(settings.section);
      $location.url('/'+settings.section);
    })


  }])

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

  .controller('listCtrl', ['$scope', 'Items', function ($scope, Items){

    $scope.items = Items;

    $scope.addItem = function() {
      var name = prompt("What buy?");
      if (name) {
        $scope.items.$add({
          "name": name
        })
      }
    };


  }])

  .controller('statsCtrl', ['$scope', function ($scope){
    $scope.d = {};
    $scope.d.section = "STATS";
    console.log("Stats Ctrl")
  }])