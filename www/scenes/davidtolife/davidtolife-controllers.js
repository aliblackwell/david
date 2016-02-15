'use strict';

angular.module('david.davidtolife', [])
  .controller('davidtolifeCtrl', ['$scope', 'LifeSwipes', 'User', 'FinishedSwipes', function ($scope, LifeSwipes, User, FinishedSwipes){

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
      if (counter == cardTypes.length) {
        $scope.epoq = true;
        setFinishedSwiping();
      }
    }

    $scope.cardSwipedLeft = function(card) {
      $scope.cardSwiped('dislike', card);

    };
    $scope.cardSwipedRight = function(card) {
      $scope.cardSwiped('like', card);
    };


  }])
