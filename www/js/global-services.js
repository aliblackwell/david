angular.module('david.global.services', [])

  .factory("FirebaseShowURL", function($firebaseObject, FIREBASE_URL) {
    var showId = localStorage.getItem('showId');
    return FIREBASE_URL + showId;
  })

  .factory("AvailablePerformances", function($firebaseObject, FIREBASE_URL) {
    var itemsRef = new Firebase(FIREBASE_URL + '/availablePerformances');
    return $firebaseObject(itemsRef);
  })

  .factory("User", function($firebaseObject, FIREBASE_URL, $rootScope) {
      var user = {

      }

      user.create = function(uid, slug) {
        console.log(FIREBASE_URL + slug +'/users/'+uid)
        var itemsRef = new Firebase(FIREBASE_URL + slug +'/users/'+uid);
        return $firebaseObject(itemsRef);
      }

      return user;

  })

