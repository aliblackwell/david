'use strict';

angular.module('david.hips')
  .factory("HipsUserResponse", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var HipsUserResponse = function(user, voteIteration) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/responses/' + voteIteration + '/' + user.$id);
      return $firebaseObject(itemsRef);
    }
    return HipsUserResponse;
  }])

  .factory("HipsAudienceResponses", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var HipsAudienceResponses = function(voteIteration) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/responses/' + voteIteration);
      return $firebaseObject(itemsRef);
    }
    return HipsAudienceResponses;
  }])

  .factory("Hips", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var Hips = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips');
      return $firebaseObject(itemsRef);
    }
    return Hips;
  }])

  .factory("HipsResults", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var HipsResults = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/results');
      return $firebaseObject(itemsRef);
    }
    return HipsResults;
  }])

  .factory("HipsTimer", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var HipsTimer = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/timer/');
      return $firebaseObject(itemsRef);
    }
    return HipsTimer;
  }])
