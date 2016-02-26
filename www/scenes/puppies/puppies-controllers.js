'use strict';
angular.module('david.puppies', [])
  .controller('puppiesCtrl', ['$scope', 'PuppiesWords', 'PuppiesUserStore', '$timeout', 'user', '$state', '$window', function ($scope, PuppiesWords, PuppiesUserStore, $timeout, user, $state, $window){


    var currentSection = $state.current.name;
    var userStore = new PuppiesUserStore(currentSection, user.$id);
    $scope.userWords = {}
    userStore.$bindTo($scope, 'userWords');

    var words = new PuppiesWords();

    $scope.d = {}
    $scope.encourageReload = false;

    $scope.d.prep = true;

    //words.$bindTo($scope, 'words');

    words.$watch(function() {
      // we are only watching, not binding/syncing to remove chance of falling out of sync
      $scope.words = words;

      if (!$scope.d.encourageReload) {
        var biggestWord = 0;
        angular.forEach(words, function(word, key) {
          if (word.tapCount > biggestWord) {
            biggestWord = word.tapCount;
          }
        })
        if (biggestWord > ($window.innerWidth - 20)) {
          $scope.d.encourageReload = true;
        }
      }
    })

    $scope.tapWord = function(wordObj) {
      var word = wordObj.word;
      if ($scope.userWords[word]) {
        $scope.userWords[word].tapCount++;
      } else {
        $scope.userWords[word] = {};
        $scope.userWords[word].tapCount = 1;
      }
      // Update count locally to feel immediate
      // this will get overwritten in the next $watch cycle
      // $scope.words[wordObj.word].tapCount+=1;
    }

    $timeout(function() {
      $scope.d.prep = false;
    }, 2000);



  }])
