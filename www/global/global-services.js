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
    var AvailablePerformances = function() {
      var itemsRef = new Firebase(FIREBASE_URL + '/availablePerformances');
      return $firebaseObject(itemsRef);
    }
    return AvailablePerformances;
  })




