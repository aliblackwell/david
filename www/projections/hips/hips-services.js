'use strict';

angular.module('projections.davidtolife')

  .factory("Hips", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
        var Hips = function() {
          var f = new FirebaseShowURL();
          var itemsRef = new Firebase(f.url + '/hips');
          return $firebaseObject(itemsRef);
        }
        return Hips;
      }])

  .factory("HipsResults", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var HipsResults = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/results');
      return $firebaseObject(itemsRef);
    }
    return HipsResults;
  }])