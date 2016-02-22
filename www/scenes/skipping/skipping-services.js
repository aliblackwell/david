'use strict';

angular.module('david.skipping')
  .factory("SkippingStore",['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var SkippingStore = function(currentSection) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/skipping/');
      return $firebaseObject(itemsRef);
    }
    return SkippingStore;
  }])
