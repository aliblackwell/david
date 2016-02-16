'use strict';

angular.module('david.welcome', [])

  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', 'Settings', '$rootScope', '$timeout', 'LifeSwipes', 'FinishedSwipes', function ($scope, User, AvailablePerformances, $location, Settings, $rootScope, $timeout, LifeSwipes, FinishedSwipes){

    var user, shows;

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.formFilled = false;

    var loadAvailableShows = function() {
      shows = new AvailablePerformances();
      shows.$loaded().then(function(){
        $scope.d.shows = shows;
        $scope.d.saveState = 'Save';
        $scope.d.buttonStyle = 'button-positive'
        loadUser();
      })
    }

    var loadUser = function() {
      user = new User();
      user.$bindTo($scope, 'user');
      user.$loaded().then(function() {
        if (user.name) {
          $scope.saveResponse();
        }
      })

    }

    $scope.setShow = function() {
      if ($scope.user.show) {
        localStorage.setItem('showId', $scope.user.show);
      }
      $rootScope.watchSettings();
      $scope.resetSave();
    }

    $scope.saveResponse = function() {
      if ($scope.d.formFilled) {
        $scope.d.saveState = 'Save';
        $scope.d.buttonStyle = 'button-positive';
        $scope.d.formFilled = false;
      } else {
        $scope.d.saveState = 'Edit';
        $scope.d.buttonStyle = 'button-balanced';
        $scope.d.formFilled = true;
      }

    }

    $scope.resetSave = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button-positive';
    }

    loadAvailableShows();


    var lifeSwipes,
        counter = 0,
        cardTypes = [
      { image: '/img/davids/d1.jpg' },
      { image: '/img/davids/d2.jpg' },
      { image: '/img/davids/d3.jpg' },
      { image: '/img/davids/d4.jpg' }
    ];

    var setFinishedSwiping = function() {
      var finished = new FinishedSwipes();

      finished.$add(user);
    }

    var user = new User();

    user.$loaded().then(function(){
      user.uuid = user.$id;
      lifeSwipes = new LifeSwipes(user);
      $scope.cards = Array.prototype.slice.call(cardTypes, 0);
    })





    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.cardSwiped = function(sentiment, card) {
      counter++;
      card.sentiment = sentiment;
      lifeSwipes.$add(card);
      lifeSwipes.$save();
    }

    $scope.cardSwipedLeft = function(card) {
      $scope.cardSwiped('dislike', card);

    };
    $scope.cardSwipedRight = function(card) {
      $scope.cardSwiped('like', card);
    };


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (shows) {
        shows.$destroy()
      }
      if (user) {
        user.$destroy();
      }
    });


  }])
