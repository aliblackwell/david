'use strict';
angular.module('david.welcome')
  .factory('LifeSwipes', ['$firebaseArray', 'FirebaseShowURL', function($firebaseArray, FirebaseShowURL) {
    var LifeSwipes = function(user) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/lifeswipes/' + user.$id);
      return $firebaseArray(itemsRef);
    }
    return LifeSwipes;
  }])

  .factory('TinderCards', function() {
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
    return allCards;
  })
