'use strict';

angular.module('david.hips')
  .factory("HipsResponses", function($firebaseObject, FirebaseShowURL) {
    var HipsResponses = function(user, voteIteration) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/responses/' + voteIteration + '/' + user.$id);
      return $firebaseObject(itemsRef);
    }
    return HipsResponses;
  })

  .factory("Hips", function($firebaseObject, FirebaseShowURL) {
    var Hips = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips');
      return $firebaseObject(itemsRef);
    }
    return Hips;
  })

  .factory("HipsResults", function($firebaseObject, FirebaseShowURL) {
    var HipsResults = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/results');
      return $firebaseObject(itemsRef);
    }
    return HipsResults;
  })

  .factory("HipsTimer", function($firebaseObject, FirebaseShowURL) {
    var HipsTimer = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/timer/');
      return $firebaseObject(itemsRef);
    }
    return HipsTimer;
  })
