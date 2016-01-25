angular.module('david.show.services', [])

  .factory("User", function($firebaseObject, FIREBASE_URL) {
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

  .factory("Hips", function($firebaseObject, FirebaseShowURL) {
    var Hips = function(user) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/responses/' + user.$id);
      return $firebaseObject(itemsRef);
    }
    return Hips;
  })

  .factory("HipsResult", function($firebaseObject, FirebaseShowURL) {
    var HipsResult = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/result/');
      return $firebaseObject(itemsRef);
    }
    return HipsResult;
  })



