'use strict';

angular.module('david.decisions', ['firebase'])
  .controller('decisionsCtrl', ['$scope', '$state', 'user', 'DecisionStore', 'DecisionImages', 'DecisionTimer', 'DecisionResult', '$timeout', 'preloader', function ($scope, $state, user, DecisionStore, DecisionImages, DecisionTimer, DecisionResult, $timeout, preloader){
    var images,
        numberOfDecisions,
        timerUnwatch,
        resultUnwatch,
        store;

    $scope.d = {}
    $scope.d.decided = false;
    $scope.d.heading = 'Choose';

    var currentSection = $state.current.name;

    images = new DecisionImages(currentSection);
    var imagesToPreload = []
    imagesToPreload.push(images.choice1.imgUrl);
    imagesToPreload.push(images.choice2.imgUrl);
    preloader.preloadImages(imagesToPreload)
    .then(function() {
      init();
    })

    var init = function() {
      store = new DecisionStore(currentSection, user);
      store.$loaded().then(function(){
        loadPage();
      })
    }

    var decisionsTimer = new DecisionTimer(currentSection);
    decisionsTimer.$loaded().then(function(){
      timerUnwatch = decisionsTimer.$watch(function() {
        $scope.d.timer = decisionsTimer.$value;
        if ($scope.d.timer === 0) {
          $timeout(function() {
            calculateResults();
          }, 1000)
        }
      })
    })

    var decisionsResult = new DecisionResult(currentSection);
    decisionsResult.$loaded().then(function(){
      resultUnwatch = decisionsResult.$watch(function() {
        $scope.d.result = decisionsResult.$value;
      })
    })




    var loadPage = function() {
      $scope.choices = images
      $scope.imagesLoaded = true;
      showAudienceResults();
      watchResults();
    }

    var watchResults = function() {
      // Every time the results change in Firebase
      $scope.unwatchResults = store.$watch(function() {
        showAudienceResults();
      })
    }

    var showAudienceResults = function() {
      numberOfDecisions = []
      angular.forEach(store, function(k,v) {
        numberOfDecisions.push(k)
      });

      var numDecs;
      if (numberOfDecisions.length <= 8) {
        numDecs = 2;
      }

      if (numberOfDecisions.length > 8 && numberOfDecisions.length <= 16) {
        numDecs = 3;
      }

      if (numberOfDecisions.length >= 17) {
        numDecs = 4;
      }

      $scope.d.thumbWidth = 100 / numDecs;
      $scope.d.results = store;
    }

    var calculateResults = function() {
      var firstOption = [];
      var secondOption = [];
      var result;
      angular.forEach(store, function(v) {
        if (images.choice1.choiceName === v.choiceName) {
          firstOption.push(v);

        } else {
          secondOption.push(v);

        }

      })

      if (firstOption.length <= secondOption.length) {
        $scope.d.result = images.choice2;
      } else {
        $scope.d.result = images.choice1
      }
      $scope.d.heading = 'You and the audience chose'
      $scope.d.decided = true;
    }

    $scope.makeChoice = function(choice) {
      choice.chosen = true;
      angular.forEach($scope.choices, function(v,k) {
        if (v.choiceName != choice.choiceName) {
          v.chosen = false
        } else {
          v.chosen = true;
          saveChoice(v);
        }
      })
    }

    var saveChoice = function(v) {
      store[user.$id] = v;
      store.$save();
    }

    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (user) {
        user.$destroy()
      }
      if (store) {
        store.$destroy();
      }
      if($scope.unwatchResults) {
        $scope.unwatchResults();
      }

      if(timerUnwatch) {
        timerUnwatch()
      }

      if(resultUnwatch) {
        resultUnwatch()
      }
    });

  }])
