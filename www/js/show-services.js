angular.module('david.show.services', [])
   .factory("Items", function($firebaseArray, FirebaseShowURL) {
    var itemsRef = new Firebase(FirebaseShowURL + '/items');
    return $firebaseArray(itemsRef);
  })

  .factory("Settings", function($firebaseObject, FirebaseShowURL) {
    var itemsRef = new Firebase(FirebaseShowURL + '/settings');
    return $firebaseObject(itemsRef);
  })

  .factory("ScanningWords", function($firebaseObject, FirebaseShowURL) {
    var itemsRef = new Firebase(FirebaseShowURL + '/scanningwords');
    return $firebaseObject(itemsRef);
  })
