'use strict';
angular.module('david.davidtolife')
  .factory("LifeSwipes", function($firebaseArray, FirebaseShowURL) {
    var LifeSwipes = function(user) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/lifeswipes/' + user.$id);
      return $firebaseArray(itemsRef);
    }
    return LifeSwipes;
  })

  .factory("FinishedSwipes", function($firebaseArray, FirebaseShowURL) {
    var FinishedSwipes = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/finishedswipes');
      return $firebaseArray(itemsRef);
    }
    return FinishedSwipes;
  })
