'use strict';
angular.module('david.davidtolife')

  .factory("FinishedSwipes", ['$firebaseArray', 'FirebaseShowURL', function($firebaseArray, FirebaseShowURL) {
    var FinishedSwipes = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/finishedswipes');
      return $firebaseArray(itemsRef);
    }
    return FinishedSwipes;
  }])
