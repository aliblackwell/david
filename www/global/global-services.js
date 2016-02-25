angular.module('david.global.services', [])

  .factory("FirebaseShowURL", ['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL) {
    var FirebaseShowURL =  function() {
      var showId = localStorage.getItem('showId'),
          url = FIREBASE_URL + showId;
      return {
        url: url
      }
    }
    return FirebaseShowURL;
  }])

  .factory("AvailablePerformances", ['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL) {
    var AvailablePerformances = function() {
      var itemsRef = new Firebase(FIREBASE_URL + '/availablePerformances');
      return $firebaseObject(itemsRef);
    }
    return AvailablePerformances;
  }])

  .factory("TriggerReload", ['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL){
    var TriggerReload = function() {
      var itemsRef = new Firebase(FIREBASE_URL + '/reload');
      return $firebaseObject(itemsRef);
    }
    return TriggerReload;
  }])

  .factory('ActiveSection', ['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL){
    var ActiveSection = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/settings');
      return $firebaseObject(itemsRef);
    }
    return ActiveSection;
  }])

  .factory('Settings', ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var Settings = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/settings');
      return $firebaseObject(itemsRef);
    }
    return Settings;
  }])

  .factory("FinishedSwipes", ['$firebaseArray', 'FirebaseShowURL', function($firebaseArray, FirebaseShowURL) {
    var FinishedSwipes = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/finishedswipes');
      return $firebaseArray(itemsRef);
    }
    return FinishedSwipes;
  }])

  .factory("NetworkCheck", ['FIREBASE_URL', function(FIREBASE_URL) {
    return new Firebase(FIREBASE_URL + 'networkcheck');
  }])




