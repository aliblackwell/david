'use strict';

angular.module('david.puppies')

  .factory("PuppiesWords", ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var url = new FirebaseShowURL();
      var itemsRef = new Firebase(url.url + '/puppies/puppieswords');
      return $firebaseObject(itemsRef);
    }])

  // TODO
  .factory("PuppiesWordsAllResults", ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var url = new FirebaseShowURL();
      var itemsRef = new Firebase(url.url + '/puppies/individualtaps');
      return $firebaseObject(itemsRef);
    }])
