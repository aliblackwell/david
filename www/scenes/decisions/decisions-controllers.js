'use strict';

angular.module('david.decisions', ['firebase'])
  .controller('decisionsCtrl', ['$scope', '$state', 'user', 'DecisionStoreUser', 'DecisionImages', 'Decisions', 'DecisionsTimer', '$timeout', 'preloader', function ($scope, $state, user, DecisionStoreUser, DecisionImages, Decisions, DecisionsTimer, $timeout, preloader){
    var images,
        numberOfDecisions,
        decisionsUnwatch,
        timerUnwatch,
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

    var loadPage = function() {
      $scope.choices = images
      $scope.imagesLoaded = true;
      showAudienceResults();
      //watchResults();
    }

    var showAudienceResults = function() {
      numberOfDecisions = []
      angular.forEach(decisions.responses, function(k,v) {
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
      $scope.d.results = decisions.responses;
    }



    var decisions = new Decisions(currentSection);

    decisionsUnwatch = decisions.$watch(function() {
      showAudienceResults();
    })

    var timer = new DecisionsTimer(currentSection);
    timerUnwatch = timer.$watch(function(){
      $scope.d.timer = timer.timer
      if ($scope.d.timer === 0) {
        $timeout(function() {
          calculateResults();
        }, 1000)
      }
    })

    var calculateResults = function() {
      var firstOption = [];
      var secondOption = [];
      var result;
      angular.forEach(decisions.responses, function(v) {
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
          $scope.decision = v;
        }
      })
    }

    var init = function() {
      store = new DecisionStoreUser(currentSection, user.$id);
      store.$bindTo($scope, 'decision');
      loadPage();
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

      if(decisionsUnwatch) {
        decisionsUnwatch()
      }

      if(timerUnwatch) {
        timerUnwatch()
      }
    });

  }])
