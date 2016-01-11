angular.module('david.services', [])

  .factory("Items", function($firebaseArray, FIREBASE_URL) {
    var itemsRef = new Firebase(FIREBASE_URL + '/items');
    return $firebaseArray(itemsRef);
  })

  .factory("Settings", function($firebaseObject, FIREBASE_URL) {
    var itemsRef = new Firebase(FIREBASE_URL + '/settings');
    return $firebaseObject(itemsRef);
  })

  .factory("ScanningWords", function($firebaseObject, FIREBASE_URL) {
    var itemsRef = new Firebase(FIREBASE_URL + '/scanningwords');
    return $firebaseObject(itemsRef);
  })