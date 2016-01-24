angular.module('david.show.services', [])
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



