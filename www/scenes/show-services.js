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









