'use strict';

angular.module('david.welcome', [])

  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', 'Settings', '$rootScope', '$timeout', '$interval', 'LifeSwipes', '$ionicModal', 'preloader', 'TinderCards', function ($scope, User, AvailablePerformances, $location, Settings, $rootScope, $timeout, $interval, LifeSwipes, $ionicModal, preloader, TinderCards){

    var user, shows, lifeSwipes,
        firstCards = [
      { image: '/img/davids/excited.jpg' },
      { image: '/img/davids/professional.jpg' }
    ];

    var allCards = TinderCards;
    var imagesToPreload = [];
    for (var i=0; i<allCards.length; i++) {
      imagesToPreload.push(allCards[i].image);
    }

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.formFilled = false;

    preloader.preloadImages(imagesToPreload)
    .then(function() {
      loadAvailableShows();
    })

    $scope.d.openModal = function() {
      user.readTCs = true;
      user.$save();
      $scope.modal.show();
    };

    var loadAvailableShows = function() {
      shows = new AvailablePerformances();
      shows.$loaded().then(function(){
        $scope.d.shows = shows;
        $scope.d.saveState = 'Save';
        $scope.d.buttonStyle = 'button button-full button-positive';
        loadUser();
      })
    }

    var loadUser = function() {
      user = new User();
      user.$bindTo($scope, 'user');
      user.$loaded().then(function() {

        user.uuid = user.$id;
        if (user.name) {
          $scope.saveResponse();
        }

        $scope.pageLoaded = true;

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
        $scope.d.buttonStyle = 'button button-full button-positive';
        $scope.d.formFilled = false;
      } else {
        $scope.showName = shows[$scope.user.show].name;
        $scope.d.saveState = 'Edit';
        $scope.d.buttonStyle = 'edit-toggle';
        lifeSwipes = new LifeSwipes(user);
        $scope.cards = Array.prototype.slice.call(firstCards, 0);
        $scope.d.formFilled = true;
      }
    }

    $scope.resetSave = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button button-full button-positive';
    }






    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = allCards[Math.floor(Math.random() * allCards.length)];
      newCard.id = Math.random();
      $scope.cards.unshift(angular.extend({}, newCard));
    }

    $scope.cardSwiped = function(sentiment, card) {
      card.sentiment = sentiment;
      lifeSwipes.$add(card);
      lifeSwipes.$save();
      $scope.addCard();
      $scope.addCard(); // hack. cards don't always register as having swiped
    }

    $scope.cardSwipedLeft = function(card) {
      $scope.cardSwiped('dislike', card);
    };

    $scope.cardSwipedRight = function(card) {
      $scope.cardSwiped('like', card);
    };

    $scope.cardPartialSwipe = function(amt) {

    }


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (shows) {
        shows.$destroy()
      }
      if (user) {
        user.$destroy();
      }
      if ($scope.cards) {
        $scope.cards = false;
      }
    });


    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });



    $scope.closeModal = function() {
      $scope.modal.hide();
    };


    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });


  }])
