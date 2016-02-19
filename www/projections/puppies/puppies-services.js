'use strict';

angular.module('projections.puppies')

  .factory("Puppies", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var Puppies = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/puppies/puppieswords');
      return $firebaseObject(itemsRef);
    }
    return Puppies;
  }])