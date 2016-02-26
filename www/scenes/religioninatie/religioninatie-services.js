'use strict';

angular.module('david.religioninatie')

  .factory("BopsUserStore", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var BopsUserStore = function(user) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/religioninatie/responses/' + user.$id);
      return $firebaseObject(itemsRef);
    }
    return BopsUserStore;
  }])