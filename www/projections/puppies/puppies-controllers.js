'use strict';

angular.module('projections.puppies', ['ngFitText'])
  .controller('puppiesCtrl', ['$scope', 'Puppies', '$interval', function ($scope, Puppies, $interval){

    var puppies, results;
    $scope.d = {}
    $scope.d.newWidth = 50;

    puppies = new Puppies();

    // $scope.unwatchResults = puppies.$watch(function() {

    var updateLoop = $interval(function() {
      console.log(puppies)
      var highest = 0;
      var newWord;
      angular.forEach(puppies, function(v,k) {
        if (v.tapCount > highest) {
          highest = v.tapCount;
          newWord = v.word
        }
        $scope.d.activeWord = newWord;
      })

    }, 100)
    //})

    // var watchResults = function() {
    //   results = new puppiesResults();
    //   // Every time the results change in Firebase
    //   $scope.unwatchResults = results.$watch(function() {
    //     if(results[puppies.voteIteration]) {
    //       $scope.d.newWidth = results[puppies.voteIteration].avg;
    //     }
    //   });
    // }







  }])
