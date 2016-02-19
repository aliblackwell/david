'use strict';

angular.module('david.waltz')
  .factory("WaltzGroups",['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var WaltzGroups = function(currentSection) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/waltz/groups/');
      return $firebaseObject(itemsRef);
    }
    return WaltzGroups;
  }])