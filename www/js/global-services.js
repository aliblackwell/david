angular.module('david.global.services', [])

  .factory("FirebaseShowURL", function($firebaseObject, FIREBASE_URL) {
    var FirebaseShowURL =  function() {
      var showId = localStorage.getItem('showId'),
          url = FIREBASE_URL + showId;
      return {
        url: url
      }
    }
    return FirebaseShowURL;
  })

  .factory("AvailablePerformances", function($firebaseObject, FIREBASE_URL) {
    var itemsRef = new Firebase(FIREBASE_URL + '/availablePerformances');
    return $firebaseObject(itemsRef);
  })

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

