angular.module('david.show.services', [])

  .factory("User", function($firebaseObject, FIREBASE_URL) {
    var User = function() {
      var showId, uuid,
          itemsRef, fbUrl;
      // Get/Set UUID
      if (localStorage.getItem('uuid')) {
        uuid = localStorage.getItem('uuid');
      } else {
        uuid = guid();
        localStorage.setItem('uuid', uuid);
      }
      fbUrl = FIREBASE_URL + 'users/'+uuid;
      itemsRef = new Firebase(fbUrl);
      return $firebaseObject(itemsRef);
    }
    return User;
  })

  .factory("Items", function($firebaseArray, FirebaseShowURL) {
    var url = new FirebaseShowURL();
    var itemsRef = new Firebase(url + '/items');
    return $firebaseArray(itemsRef);
  })

  .factory("Settings", function($firebaseObject, FirebaseShowURL) {
    var Settings = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/settings');
      return $firebaseObject(itemsRef);
    }
    return Settings;
  })

  .factory("ScanningWords", function($firebaseObject, FirebaseShowURL) {
    var url = new FirebaseShowURL();
    var itemsRef = new Firebase(url + '/scanningwords');
    return $firebaseObject(itemsRef);
  })

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



