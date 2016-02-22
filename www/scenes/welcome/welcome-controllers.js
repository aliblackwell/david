'use strict';

angular.module('david.welcome', [])

  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', 'Settings', '$rootScope', '$timeout', 'LifeSwipes', 'FinishedSwipes', '$ionicModal', function ($scope, User, AvailablePerformances, $location, Settings, $rootScope, $timeout, LifeSwipes, FinishedSwipes, $ionicModal){

    var user, shows;

    // Workaround for ion-content bug
    $scope.d = {};

    console.log('welcome')

    $scope.d.formFilled = false;


    var loadAvailableShows = function() {
      console.log('loading shows')
      shows = new AvailablePerformances();
      shows.$loaded().then(function(){
        console.log(shows);
        $scope.d.shows = shows;
        $scope.d.saveState = 'Save';
        $scope.d.buttonStyle = 'button button-full button-positive';
        loadUser();
      }).catch(function(error) {

      });
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
        $scope.d.buttonStyle = 'button button-full button-positive';
        $scope.d.formFilled = false;
      } else {
        $scope.d.saveState = 'Edit';
        $scope.d.buttonStyle = 'edit-toggle';
        $scope.d.formFilled = true;
      }

    }

    $scope.resetSave = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button button-full button-positive';
    }

    loadAvailableShows();


    var lifeSwipes,
        counter = 0,
        firstCards = [
      { image: '/img/davids/excited.jpg' },
      { image: '/img/davids/professional.jpg' }
    ];

    var allCards = [
      { image: '/img/davids/angry.jpg' },
      { image: '/img/davids/debauched.jpg' },
      { image: '/img/davids/defamation.jpg' },
      { image: '/img/davids/disappearing.jpg' },
      { image: '/img/davids/disgust.jpg' },
      { image: '/img/davids/dull.jpg' },
      { image: '/img/davids/excited.jpg' },
      { image: '/img/davids/professional.jpg' },
      { image: '/img/davids/sad.jpg' }
    ];

    var setFinishedSwiping = function() {
      var finished = new FinishedSwipes();

      finished.$add(user);
    }

    var user = new User();

    user.$loaded().then(function(){
      user.uuid = user.$id;
      lifeSwipes = new LifeSwipes(user);
      $scope.cards = Array.prototype.slice.call(firstCards, 0);
    })





    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = allCards[Math.floor(Math.random() * allCards.length)];
      newCard.id = Math.random();
      $scope.cards.unshift(angular.extend({}, newCard));
    }

    $scope.cardSwiped = function(sentiment, card) {
      counter++;
      card.sentiment = sentiment;
      lifeSwipes.$add(card);
      lifeSwipes.$save();
    }

    $scope.cardSwipedLeft = function(card) {
      $scope.cardSwiped('dislike', card);
      $scope.addCard();

    };
    $scope.cardSwipedRight = function(card) {
      $scope.cardSwiped('like', card);
      $scope.addCard();
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


    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      user.readTCs = true;
      user.$save();
      console.log(user);
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });


  }])
